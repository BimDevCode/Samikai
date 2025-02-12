// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.

using IdentityServerHost.Quickstart.UI;

namespace Conbent.Identity.API.Quickstart.Account
{
    [SecurityHeaders]
    [AllowAnonymous]
    public class AccountController(
        UserManager<ApplicationUser> userManager,
        SignInManager<ApplicationUser> signInManager,
        IIdentityServerInteractionService interaction,
        IClientStore clientStore,
        IAuthenticationSchemeProvider schemeProvider,
        IAuthenticationHandlerProvider handlerProvider,
        IEventService events)
        : Controller
    {
        //private readonly IIntegrationEventService _integrationEventService;

        //IIntegrationEventService integrationEventService,
        //_integrationEventService = integrationEventService;

        /// <summary>
        /// Entry point into the login workflow
        /// </summary>
        [HttpGet]
        public async Task<IActionResult> Login(string returnUrl)
        {
            // build a model so we know what to show on the login page
            var vm = await BuildLoginViewModelAsync(returnUrl);

            ViewData["ReturnUrl"] = returnUrl;

            if (vm.IsExternalLoginOnly)
            {
                // we only have one option for logging in and it's an external provider
                return RedirectToAction("Challenge", "External", new { scheme = vm.ExternalLoginScheme, returnUrl });
            }

            return View(vm);
        }

        /// <summary>
        /// Handle postback from username/password login
        /// </summary>
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Login(LoginInputModel model, string button)
        {

            // check if we are in the context of an authorization request
            var context = await interaction.GetAuthorizationContextAsync(model.ReturnUrl);

            // the user clicked the "cancel" button
            if (button == "create")
            {
                return RedirectToAction("Create",  new { returnUrl = model.ReturnUrl });
            }
            if (button != "login")
            {
                if (context != null)
                {
                    // if the user cancels, send a result back into IdentityServer as if they 
                    // denied the consent (even if this client does not require consent).
                    // this will send back an access denied OIDC error response to the client.
                    await interaction.DenyAuthorizationAsync(context, AuthorizationError.AccessDenied);

                    // we can trust model.ReturnUrl since GetAuthorizationContextAsync returned non-null
                    return context.IsNativeClient() ?
                        // The client is native, so this change in how to
                        // return the response is for better UX for the end user.
                        this.LoadingPage("Redirect", model.ReturnUrl) : Redirect(model.ReturnUrl);
                }
                else
                {
                    // since we don't have a valid context, then we just go back to the home page
                    return Redirect("~/");
                }
            }

            if (ModelState.IsValid)
            {
                var result = await signInManager.PasswordSignInAsync(model.Username, model.Password, model.RememberLogin, lockoutOnFailure: true);
                if (result.Succeeded)
                {
                    var user = await userManager.FindByNameAsync(model.Username);
                    if (user == null)
                    {
                        ModelState.AddModelError(string.Empty, AccountOptions.InvalidCredentialsErrorMessage);
                        return View(await BuildLoginViewModelAsync(model));
                    }
                    await events.RaiseAsync(new UserLoginSuccessEvent(user.UserName, user.Id, user.UserName, clientId: context?.Client.ClientId));

                    if (context != null)
                    {
                        return context.IsNativeClient() ?
                            // The client is native, so this change in how to
                            // return the response is for better UX for the end user.
                            this.LoadingPage("Redirect", model.ReturnUrl) :
                            // we can trust model.ReturnUrl since GetAuthorizationContextAsync returned non-null
                            Redirect(model.ReturnUrl);
                    }

                    // request for a local page
                    if (Url.IsLocalUrl(model.ReturnUrl))
                    {
                        return Redirect(model.ReturnUrl);
                    }
                    else if (string.IsNullOrEmpty(model.ReturnUrl))
                    {
                        return Redirect("~/");
                    }
                    else
                    {
                        // user might have clicked on a malicious link - should be logged
                        throw new Exception("invalid return URL");
                    }
                }

                await events.RaiseAsync(new UserLoginFailureEvent(model.Username, "invalid credentials", clientId: context?.Client.ClientId));
                ModelState.AddModelError(string.Empty, AccountOptions.InvalidCredentialsErrorMessage);
            }

            // something went wrong, show form with error
            var vm = await BuildLoginViewModelAsync(model);

            ViewData["ReturnUrl"] = model.ReturnUrl;

            return View(vm);
        }

        /// <summary>
        /// Show logout page
        /// </summary>
        [HttpGet]
        public async Task<IActionResult> Logout(string logoutId)
        {
            // build a model so the logout page knows what to display
            var vm = await BuildLogoutViewModelAsync(logoutId);

            if (vm.ShowLogoutPrompt == false)
            {
                // if the request for logout was properly authenticated from IdentityServer, then
                // we don't need to show the prompt and can just log the user out directly.
                return await Logout(vm);
            }

            return View(vm);
        }

        /// <summary>
        /// Handle logout page postback
        /// </summary>
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Logout(LogoutInputModel model)
        {
            // build a model so the logged out page knows what to display
            var vm = await BuildLoggedOutViewModelAsync(model.LogoutId);

            if (User.Identity!.IsAuthenticated)
            {
                // delete local authentication cookie
                await signInManager.SignOutAsync();
                // raise the logout event
                await events.RaiseAsync(new UserLogoutSuccessEvent(User.GetSubjectId(), User.GetDisplayName()));
            }

            // check if we need to trigger sign-out at an upstream identity provider
            if (!vm.TriggerExternalSignout) return View("LoggedOut", vm);
            // build a return URL so the upstream provider will redirect back
            // to us after the user has logged out. this allows us to then
            // complete our single sign-out processing.
            var url = Url.Action("Logout", new { logoutId = vm.LogoutId });
            // this triggers a redirect to the external provider for sign-out
            return SignOut(new AuthenticationProperties { RedirectUri = url }, vm.ExternalAuthenticationScheme);
        }

        [HttpGet]
        public IActionResult AccessDenied() => View();


        /*****************************************/
        /* helper APIs for the AccountController */
        /*****************************************/
        private async Task<CreateViewModel> BuildCreateViewModelAsync(string returnUrl)
        {
            var context = await interaction.GetAuthorizationContextAsync(returnUrl);
            if (context is null) return new CreateViewModel { ReturnUrl = returnUrl };
            if (context.IdP != null && await schemeProvider.GetSchemeAsync(context.IdP) != null)
            {
                var local = context.IdP == IdentityServerConstants.LocalIdentityProvider;
                // this is meant to short circuit the UI and only trigger the one external IdP
                var vm = new CreateViewModel
                {
                    ReturnUrl = returnUrl,
                    Username = context.LoginHint,
                };

                if (!local) vm.ExternalProviders = new[] { new ExternalProvider { AuthenticationScheme = context.IdP } };
                return vm;
            }

            var schemes = await schemeProvider.GetAllSchemesAsync();
            var providers = schemes
                .Where(x => x.DisplayName != null)
                .Select(x => new ExternalProvider
                {
                    DisplayName = x.DisplayName ?? x.Name,
                    AuthenticationScheme = x.Name
                }).ToList();

            var client = await clientStore.FindEnabledClientByIdAsync(context.Client.ClientId);
            if (client == null)
                return new CreateViewModel()
                {
                    ReturnUrl = returnUrl,
                    Username = context?.LoginHint,
                    ExternalProviders = providers.ToArray()
                };
            if (client.IdentityProviderRestrictions.Count != 0)
            {
                providers = providers.Where(provider => client.IdentityProviderRestrictions.Contains(provider.AuthenticationScheme)).ToList();
            }

            return new CreateViewModel()
            {
                ReturnUrl = returnUrl,
                Username = context?.LoginHint,
                ExternalProviders = providers.ToArray()
            };
        }
        private async Task<CreateViewModel> BuildCreateViewModelAsync(CreateInputModel model)
        {
            var vm = await BuildCreateViewModelAsync(model.ReturnUrl);
            vm.Username = model.Username;
            vm.Name = model.Name;
            vm.Email = model.Email;
            return vm;
        }

        private async Task<LoginViewModel> BuildLoginViewModelAsync(string returnUrl)
        {
            var context = await interaction.GetAuthorizationContextAsync(returnUrl);
            if (context?.IdP != null && await schemeProvider.GetSchemeAsync(context.IdP) != null)
            {
                var local = context.IdP == IdentityServerConstants.LocalIdentityProvider;

                // this is meant to short circuit the UI and only trigger the one external IdP
                var vm = new LoginViewModel
                {
                    EnableLocalLogin = local,
                    ReturnUrl = returnUrl,
                    Username = context?.LoginHint,
                };

                if (!local)
                {
                    vm.ExternalProviders = new[] { new ExternalProvider { AuthenticationScheme = context.IdP } };
                }

                return vm;
            }

            var schemes = await schemeProvider.GetAllSchemesAsync();

            var providers = schemes
                .Where(x => x.DisplayName != null)
                .Select(x => new ExternalProvider
                {
                    DisplayName = x.DisplayName ?? x.Name,
                    AuthenticationScheme = x.Name
                }).ToList();

            var allowLocal = true;
            if (context?.Client.ClientId != null)
            {
                var client = await clientStore.FindEnabledClientByIdAsync(context.Client.ClientId);
                if (client != null)
                {
                    allowLocal = client.EnableLocalLogin;

                    if (client.IdentityProviderRestrictions != null && client.IdentityProviderRestrictions.Any())
                    {
                        providers = providers.Where(provider => client.IdentityProviderRestrictions.Contains(provider.AuthenticationScheme)).ToList();
                    }
                }
            }

            return new LoginViewModel
            {
                AllowRememberLogin = AccountOptions.AllowRememberLogin,
                EnableLocalLogin = allowLocal && AccountOptions.AllowLocalLogin,
                ReturnUrl = returnUrl,
                Username = context?.LoginHint,
                ExternalProviders = providers.ToArray()
            };
        }
        private async Task<LoginViewModel> BuildLoginViewModelAsync(LoginInputModel model)
        {
            var vm = await BuildLoginViewModelAsync(model.ReturnUrl);
            vm.Username = model.Username;
            vm.RememberLogin = model.RememberLogin;
            return vm;
        }

        private async Task<LogoutViewModel> BuildLogoutViewModelAsync(string logoutId)
        {
            var vm = new LogoutViewModel { LogoutId = logoutId, ShowLogoutPrompt = AccountOptions.ShowLogoutPrompt };

            if (User?.Identity.IsAuthenticated != true)
            {
                // if the user is not authenticated, then just show logged out page
                vm.ShowLogoutPrompt = false;
                return vm;
            }

            var context = await interaction.GetLogoutContextAsync(logoutId);
            if (context?.ShowSignoutPrompt == false)
            {
                // it's safe to automatically sign-out
                vm.ShowLogoutPrompt = false;
                return vm;
            }

            // show the logout prompt. this prevents attacks where the user
            // is automatically signed out by another malicious web page.
            return vm;
        }
        private async Task<LoggedOutViewModel> BuildLoggedOutViewModelAsync(string logoutId)
        {
            // get context information (client name, post logout redirect URI and iframe for federated signout)
            var logout = await interaction.GetLogoutContextAsync(logoutId);

            var vm = new LoggedOutViewModel
            {
                AutomaticRedirectAfterSignOut = AccountOptions.AutomaticRedirectAfterSignOut,
                PostLogoutRedirectUri = logout?.PostLogoutRedirectUri,
                ClientName = string.IsNullOrEmpty(logout?.ClientName) ? logout?.ClientId : logout?.ClientName,
                SignOutIframeUrl = logout?.SignOutIFrameUrl,
                LogoutId = logoutId
            };
            if(User.Identity is null) 
                return vm;

            if (!User.Identity.IsAuthenticated) return vm;
            var idp = User.FindFirst(JwtClaimTypes.IdentityProvider)?.Value;
            if (idp is null or IdentityServerConstants.LocalIdentityProvider) return vm;
            var handler = await handlerProvider.GetHandlerAsync(HttpContext, idp);
            if (handler is not IAuthenticationSignOutHandler) return vm;
            vm.LogoutId ??= await interaction.CreateLogoutContextAsync();
            vm.ExternalAuthenticationScheme = idp;
            return vm;
        }


        [HttpGet]
        public async Task<IActionResult> Create(string returnUrl)
        {
            var vm = await BuildCreateViewModelAsync(returnUrl);
            ViewData["ReturnUrl"] = returnUrl;
            return View(vm);
        }

        /// <summary>
        /// Handle postback from username/password login
        /// </summary>
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(CreateInputModel model, string button)
        {
            // check if we are in the context of an authorization request
            var context = await interaction.GetAuthorizationContextAsync(model.ReturnUrl);

            // the user clicked the "cancel" button
            if (button != "create")
            {
                if (context != null)
                {
                    // if the user cancels, send a result back into IdentityServer as if they 
                    // denied the consent (even if this client does not require consent).
                    // this will send back an access denied OIDC error response to the client.
                    await interaction.DenyAuthorizationAsync(context, AuthorizationError.AccessDenied);

                    // we can trust model.ReturnUrl since GetAuthorizationContextAsync returned non-null
                    return context.IsNativeClient() ?
                        // The client is native, so this change in how to
                        // return the response is for better UX for the end user.
                        this.LoadingPage("Redirect", model.ReturnUrl) : Redirect(model.ReturnUrl ?? "~/");
                }
                else
                {
                    // since we don't have a valid context, then we just go back to the home page
                    return Redirect("~/");
                }
            }

            var user = await userManager.FindByNameAsync(model.Username);
            if (user != null) ModelState.AddModelError("Username", "Invalid username. Username already exists");

            if (!ModelState.IsValid) return await SendViewModel(model);
            var applicationUser = new ApplicationUser()
            {
                UserName = model.Username,
                Email = model.Email,
                NormalizedUserName = model.Name,
                EmailConfirmed = false,
                CardHolderName = "",
                CardNumber = "",
                CardType = 0,
                City = "",
                Country = "",
                Expiration = "",
                Id = CryptoRandom.CreateUniqueId(format: CryptoRandom.OutputFormat.Hex),
                LastName = "",
                Name = "",
                PhoneNumber = "",
                ZipCode = "",
                State = "",
                Street = "",
                SecurityNumber = ""
            };

            // Use UserManager to create the user
            var result = await userManager.CreateAsync(applicationUser, model.Password);

            if (!result.Succeeded)
            {
                // User creation failed, handle errors
                foreach (var error in result.Errors)
                    ModelState.AddModelError(string.Empty, error.Description);
                return await SendViewModel(model);
            }
            user = await userManager.FindByNameAsync(model.Username);

            if (user == null)
            {
                ModelState.AddModelError("Username", "Can not create user");
                return await SendViewModel(model);
            }
            // issue authentication cookie with subject ID and username
            var issuer = new IdentityServerUser(user.Id)
            {
                DisplayName = user.UserName
            };

            await HttpContext.SignInAsync(issuer);

            if (context != null)
            {
                return context.IsNativeClient() ?
                    // The client is native, so this change in how to
                    // return the response is for better UX for the end user.
                    this.LoadingPage("Redirect", model.ReturnUrl) :
                    //var registerUserInteraction = new RegisterUserInteractionIntegrationEvent("s", "s", "sdsdsd");
                    //await _integrationEventService.PublishThroughEventBusAsync(registerUserInteraction);
                    // we can trust Input.ReturnUrl since GetAuthorizationContextAsync returned non-null
                    Redirect(model.ReturnUrl ?? "~/");
            }

            // request for a local page
            if (Url.IsLocalUrl(model.ReturnUrl))  return Redirect(model.ReturnUrl);

            if (string.IsNullOrEmpty(model.ReturnUrl)) return Redirect("~/");

            // user might have clicked on a malicious link - should be logged
            throw new ArgumentException("invalid return URL");
            // something went wrong, show form with error
        }

        private async Task<ViewResult> SendViewModel(CreateInputModel model)
        {
            var vm = await BuildCreateViewModelAsync(model);
            ViewData["ReturnUrl"] = model.ReturnUrl;
            return View(vm);
        }
    }
}