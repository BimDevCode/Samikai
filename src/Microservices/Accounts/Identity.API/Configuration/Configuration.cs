namespace Conbent.Identity.API.Configuration;
public abstract class Configuration
{
    private static List<string> AllIdentityScopes =>
        IdentityResources.Select(s => s.Name).ToList();

    private static List<string> AllApiScopes =>
        ApiScopes.Select(s => s.Name).ToList();

    private static List<string> AllScopes =>
        AllApiScopes.Concat(AllIdentityScopes).ToList();

    public static IEnumerable<IdentityResource> IdentityResources =>
        new List<IdentityResource>
        {
            new IdentityResources.OpenId(),
            new IdentityResources.Profile(),
            new IdentityResources.Email(),
        };

    public static IEnumerable<ApiScope> ApiScopes =>
        new List<ApiScope>
        {
            // backward compat
            new ("api"),
            // resource specific scopes
            new ("resource1.scope1"),
            new ("resource1.scope2"),

            new ("resource2.scope1"),
            new ("resource2.scope2"),

            new ("resource3.scope1"),
            new ("resource3.scope2"),
            
            // a scope without resource association
            new ("scope3"),
            new ("scope4"),
            
            // a scope shared by multiple resources
            new ("shared.scope"),

            // a parameterized scope
            new ("transaction", "Transaction")
            {
                Description = "Some Transaction"
            },
            // CodeResource 001: user Interaction
            new ("userInteraction", "User Interaction API"),
        };

    public static IEnumerable<ApiResource> ApiResources =>
        new List<ApiResource>
        {
            new ("api", "Demo API", new[] { "name", "email" })
            {
                ApiSecrets = { new Secret("secret".Sha256()) },

                Scopes = { "api" }
            },

            new ("urn:resource1", "Resource 1")
            {
                ApiSecrets = { new Secret("secret".Sha256()) },

                Scopes = { "resource1.scope1", "resource1.scope2", "shared.scope" }
            },

            new ("urn:resource2", "Resource 2")
            {
                ApiSecrets = { new Secret("secret".Sha256()) },

                Scopes = { "resource2.scope1", "resource2.scope2", "shared.scope" }
            },

            new ("urn:resource3", "Resource 3 (isolated)")
            {
                ApiSecrets = { new Secret("secret".Sha256()) },
                RequireResourceIndicator = true,

                Scopes = { "resource3.scope1", "resource3.scope2", "shared.scope" }
            },
            // CodeResource 001: user Interaction
            new ("userInteractionApi", "User Interaction API")
            {
                Scopes = { "userInteraction" }
            }
        };



    //public static IEnumerable<IdentityResource> IdentityResources =>
    //    new List<IdentityResource>
    //    {
    //        new IdentityResources.OpenId(),
    //        new IdentityResources.Profile(),
    //        new IdentityResources.Email(),
    //    };
    // ApiResources define the apis in your system
  

    // ApiScope is used to protect the API 
    //The effect is the same as that of API resources in IdentityServer 3.x
  
    // Identity resources are data like user ID, name, or email address of a user
    // see: http://docs.identityserver.io/en/release/configuration/resources.html
    //public static IEnumerable<IdentityResource> GetResources()
    //{
    //    return new List<IdentityResource>
    //    {
    //        new IdentityResources.OpenId(),
    //        new IdentityResources.Profile()
    //    };
    //}
    public static IEnumerable<Client> Clients =>
    new List<Client>
    {
            new Client
            {
                ClientId = "angularApp",
                ClientName = "Angular Application",
                AllowedGrantTypes = GrantTypes.Code,
                RedirectUris = { "https://localhost:5211/callback" },
                PostLogoutRedirectUris = { "https://localhost:5211" },
                AllowedScopes = { "openid", "profile", "email", "api", "userInteraction" },
                RequirePkce = true,
                RequireConsent = false,
                AllowAccessTokensViaBrowser = true            },
            new Client
            {
                ClientId = "desktop_client",
                ClientName = "Desktop Application",
                AllowedGrantTypes = GrantTypes.CodeAndClientCredentials,
                RequireClientSecret = false,
                //TODO Conbent MVP1: Substitute myapp to the relevant adress
                RedirectUris = { "myapp://callback" },  // Custom URI scheme for redirecting back to the app
                //TODO Conbent MVP1: Substitute myapp to the relevant adress
                PostLogoutRedirectUris = { "myapp://callback" },

                AllowedScopes = { "openid", "profile", "api1" },

                AllowOfflineAccess = true,  // Allows the client to receive refresh tokens
                RequirePkce = true,  // Enforce Proof Key for Code Exchange (PKCE)
            },

        #region Non-Interactive

            new ()
            {
                ClientId = "m2m",
                ClientName = "Machine to machine (client credentials)",
                ClientSecrets = { new Secret("secret".Sha256()) },

                AllowedGrantTypes = GrantTypes.ClientCredentials,
                AllowedScopes = AllApiScopes,
            },
            new ()
            {
                ClientId = "m2m.jwt",
                ClientName = "Machine to machine (client credentials with JWT)",
                AllowedGrantTypes = GrantTypes.ClientCredentials,
                AllowedScopes = AllApiScopes,

                ClientSecrets =
                {
                    new Secret
                    {
                        Type = IdentityServerConstants.SecretTypes.JsonWebKey,
                        Value = "{'e':'AQAB','kid':'ZzAjSnraU3bkWGnnAqLapYGpTyNfLbjbzgAPbbW2GEA','kty':'RSA','n':'wWwQFtSzeRjjerpEM5Rmqz_DsNaZ9S1Bw6UbZkDLowuuTCjBWUax0vBMMxdy6XjEEK4Oq9lKMvx9JzjmeJf1knoqSNrox3Ka0rnxXpNAz6sATvme8p9mTXyp0cX4lF4U2J54xa2_S9NF5QWvpXvBeC4GAJx7QaSw4zrUkrc6XyaAiFnLhQEwKJCwUw4NOqIuYvYp_IXhw-5Ti_icDlZS-282PcccnBeOcX7vc21pozibIdmZJKqXNsL1Ibx5Nkx1F1jLnekJAmdaACDjYRLL_6n3W4wUp19UvzB1lGtXcJKLLkqB6YDiZNu16OSiSprfmrRXvYmvD8m6Fnl5aetgKw'}"
                    }
                }
            },
            new ()
            {
                ClientId = "m2m.dpop",
                ClientName = "Machine to machine (client credentials)",
                ClientSecrets = { new Secret("secret".Sha256()) },

                AllowedGrantTypes = GrantTypes.ClientCredentials,
                AllowedScopes = AllApiScopes,

                RequireDPoP = true,
            },
            new ()
            {
                ClientId = "m2m.dpop.nonce",
                ClientName = "Machine to machine (client credentials)",
                ClientSecrets = { new Secret("secret".Sha256()) },

                AllowedGrantTypes = GrantTypes.ClientCredentials,
                AllowedScopes = AllApiScopes,

                RequireDPoP = true,
                DPoPValidationMode = DPoPTokenExpirationValidationMode.Nonce,
            },
            new ()
            {
                ClientId = "m2m.short",
                ClientName = "Machine to machine with short access token lifetime (client credentials)",
                ClientSecrets = { new Secret("secret".Sha256()) },

                AllowedGrantTypes = GrantTypes.ClientCredentials,
                AllowedScopes = AllApiScopes,
                AccessTokenLifetime = 75
            },
            new ()
            {
                ClientId = "m2m.short.jwt",
                ClientName = "Machine to machine (client credentials with JWT)",
                AllowedGrantTypes = GrantTypes.ClientCredentials,
                AllowedScopes = AllApiScopes,
                AccessTokenLifetime = 75,

                ClientSecrets =
                {
                    new Secret
                    {
                        Type = IdentityServerConstants.SecretTypes.JsonWebKey,
                        Value = "{'e':'AQAB','kid':'ZzAjSnraU3bkWGnnAqLapYGpTyNfLbjbzgAPbbW2GEA','kty':'RSA','n':'wWwQFtSzeRjjerpEM5Rmqz_DsNaZ9S1Bw6UbZkDLowuuTCjBWUax0vBMMxdy6XjEEK4Oq9lKMvx9JzjmeJf1knoqSNrox3Ka0rnxXpNAz6sATvme8p9mTXyp0cX4lF4U2J54xa2_S9NF5QWvpXvBeC4GAJx7QaSw4zrUkrc6XyaAiFnLhQEwKJCwUw4NOqIuYvYp_IXhw-5Ti_icDlZS-282PcccnBeOcX7vc21pozibIdmZJKqXNsL1Ibx5Nkx1F1jLnekJAmdaACDjYRLL_6n3W4wUp19UvzB1lGtXcJKLLkqB6YDiZNu16OSiSprfmrRXvYmvD8m6Fnl5aetgKw'}"
                    }
                }
            },

        #endregion

        #region Interacticve

            new ()
            {
                ClientId = "interactive.confidential",
                ClientName = "Interactive client (Code with PKCE)",

                RedirectUris = { "https://notused" },
                PostLogoutRedirectUris = { "https://notused" },

                ClientSecrets = { new Secret("secret".Sha256()) },

                AllowedGrantTypes = GrantTypes.CodeAndClientCredentials,
                AllowedScopes = AllScopes,

                AllowOfflineAccess = true,
                RefreshTokenUsage = TokenUsage.ReUse,
                RefreshTokenExpiration = TokenExpiration.Sliding
            },
            new ()
            {
                ClientId = "interactive.confidential.jar.jwt",
                ClientName = "Interactive client (Code with PKCE) using JAR and private key JWT",

                RedirectUris = { "https://notused" },
                PostLogoutRedirectUris = { "https://notused" },

                ClientSecrets =
                {
                    new Secret
                    {
                        Type = IdentityServerConstants.SecretTypes.JsonWebKey,
                        Value = "{'e':'AQAB','kid':'ZzAjSnraU3bkWGnnAqLapYGpTyNfLbjbzgAPbbW2GEA','kty':'RSA','n':'wWwQFtSzeRjjerpEM5Rmqz_DsNaZ9S1Bw6UbZkDLowuuTCjBWUax0vBMMxdy6XjEEK4Oq9lKMvx9JzjmeJf1knoqSNrox3Ka0rnxXpNAz6sATvme8p9mTXyp0cX4lF4U2J54xa2_S9NF5QWvpXvBeC4GAJx7QaSw4zrUkrc6XyaAiFnLhQEwKJCwUw4NOqIuYvYp_IXhw-5Ti_icDlZS-282PcccnBeOcX7vc21pozibIdmZJKqXNsL1Ibx5Nkx1F1jLnekJAmdaACDjYRLL_6n3W4wUp19UvzB1lGtXcJKLLkqB6YDiZNu16OSiSprfmrRXvYmvD8m6Fnl5aetgKw'}"
                    }
                },

                AllowedGrantTypes = GrantTypes.CodeAndClientCredentials,
                RequireRequestObject = true,
                AllowedScopes = AllScopes,

                AllowOfflineAccess = true,
                RefreshTokenUsage = TokenUsage.ReUse,
                RefreshTokenExpiration = TokenExpiration.Sliding
            },

            new ()
            {
                ClientId = "interactive.confidential.short",
                ClientName = "Interactive client with short token lifetime (Code with PKCE)",

                RedirectUris = { "https://notused" },
                PostLogoutRedirectUris = { "https://notused" },

                ClientSecrets = { new Secret("secret".Sha256()) },
                RequireConsent = false,

                AllowedGrantTypes = GrantTypes.CodeAndClientCredentials,
                RequirePkce = true,
                AllowedScopes = AllScopes,

                AllowOfflineAccess = true,
                RefreshTokenUsage = TokenUsage.ReUse,
                RefreshTokenExpiration = TokenExpiration.Sliding,

                AccessTokenLifetime = 75
            },
            new ()
            {
                ClientId = "interactive.confidential.short.jar.jwt",
                ClientName = "Interactive client (Code with PKCE) using JAR and private key JWT",

                RedirectUris = { "https://notused" },
                PostLogoutRedirectUris = { "https://notused" },

                ClientSecrets =
                {
                    new Secret
                    {
                        Type = IdentityServerConstants.SecretTypes.JsonWebKey,
                        Value = "{'e':'AQAB','kid':'ZzAjSnraU3bkWGnnAqLapYGpTyNfLbjbzgAPbbW2GEA','kty':'RSA','n':'wWwQFtSzeRjjerpEM5Rmqz_DsNaZ9S1Bw6UbZkDLowuuTCjBWUax0vBMMxdy6XjEEK4Oq9lKMvx9JzjmeJf1knoqSNrox3Ka0rnxXpNAz6sATvme8p9mTXyp0cX4lF4U2J54xa2_S9NF5QWvpXvBeC4GAJx7QaSw4zrUkrc6XyaAiFnLhQEwKJCwUw4NOqIuYvYp_IXhw-5Ti_icDlZS-282PcccnBeOcX7vc21pozibIdmZJKqXNsL1Ibx5Nkx1F1jLnekJAmdaACDjYRLL_6n3W4wUp19UvzB1lGtXcJKLLkqB6YDiZNu16OSiSprfmrRXvYmvD8m6Fnl5aetgKw'}"
                    }
                },

                AllowedGrantTypes = GrantTypes.CodeAndClientCredentials,
                RequireRequestObject = true,
                AllowedScopes = AllScopes,

                AllowOfflineAccess = true,
                RefreshTokenUsage = TokenUsage.ReUse,
                RefreshTokenExpiration = TokenExpiration.Sliding,

                AccessTokenLifetime = 75
            },

            new ()
            {
                //ClientId = "interactive.public",
                //ClientName = "Interactive client (Code with PKCE)",

                //RedirectUris = { "https://notused" },
                //PostLogoutRedirectUris = { "https://notused" },

                //RequireClientSecret = false,

                //AllowedGrantTypes = GrantTypes.Code,
                //AllowedScopes = AllScopes,

                //AllowOfflineAccess = true,
                //RefreshTokenUsage = TokenUsage.OneTimeOnly,
                //RefreshTokenExpiration = TokenExpiration.Sliding

                ClientId = "interactive.public",
                ClientName = "Interactive client (Code with PKCE)",
                AllowedGrantTypes = GrantTypes.Code,
                RequirePkce = true,
                ClientSecrets = new List<Secret>
                {
                    new Secret("secret".Sha256())
                },  
                RequireClientSecret = false,
                AllowOfflineAccess = true,
                AlwaysIncludeUserClaimsInIdToken = true,
                RedirectUris = { "https://notused" },
                PostLogoutRedirectUris = { "https://notused" },
                AllowedScopes = AllScopes,
                AccessTokenLifetime = 60*60*2, // 2 hours
                IdentityTokenLifetime= 60*60*2, // 2 hours
                RefreshTokenUsage = TokenUsage.OneTimeOnly,
                RefreshTokenExpiration = TokenExpiration.Sliding,
                //RequireDPoP = true,
                //DPoPValidationMode = DPoPTokenExpirationValidationMode.Nonce

            },

            new ()
            {
                ClientId = "native.dpop",
                ClientName = "Native client (Code with PKCE + DPop)",

                RedirectUris = { "https://notused" },
                PostLogoutRedirectUris = { "https://notused" },

                RequireClientSecret = false,

                AllowedGrantTypes = GrantTypes.Code,
                AllowedScopes = AllScopes,

                AllowOfflineAccess = true,
                RefreshTokenUsage = TokenUsage.ReUse,
                RefreshTokenExpiration = TokenExpiration.Sliding,

                RequireDPoP = true,
                DPoPValidationMode = DPoPTokenExpirationValidationMode.Nonce
            },

            new ()
            {
                ClientId = "interactive.public.short",
                ClientName = "Interactive client with short token lifetime (Code with PKCE)",

                RedirectUris = { "https://notused" },
                PostLogoutRedirectUris = { "https://notused" },

                RequireClientSecret = false,

                AllowedGrantTypes = GrantTypes.Code,
                AllowedScopes = AllScopes,

                AllowOfflineAccess = true,
                RefreshTokenUsage = TokenUsage.OneTimeOnly,
                RefreshTokenExpiration = TokenExpiration.Sliding,

                AccessTokenLifetime = 75
            },

            // not recommended - only for clients that do not support PKCE
            new ()
            {
                ClientId = "interactive.confidential.nopkce",
                ClientName = "Interactive client (Code without PKCE)",

                RedirectUris = { "https://notused" },
                PostLogoutRedirectUris = { "https://notused" },

                ClientSecrets = { new Secret("secret".Sha256()) },
                RequirePkce = false,

                AllowedGrantTypes = GrantTypes.CodeAndClientCredentials,
                AllowedScopes = AllScopes,

                AllowOfflineAccess = true,
                RefreshTokenUsage = TokenUsage.ReUse,
                RefreshTokenExpiration = TokenExpiration.Sliding
            },

            // hybrid as alternative to PKCE
            new ()
            {
                ClientId = "interactive.confidential.hybrid",
                ClientName = "Interactive client (Code with Hybrid Flow)",

                RedirectUris = { "https://notused" },
                PostLogoutRedirectUris = { "https://notused" },

                ClientSecrets = { new Secret("secret".Sha256()) },
                RequirePkce = false,

                AllowedGrantTypes = GrantTypes.HybridAndClientCredentials,
                AllowedScopes = AllScopes,

                AllowOfflineAccess = true,
                RefreshTokenUsage = TokenUsage.ReUse,
                RefreshTokenExpiration = TokenExpiration.Sliding
            },

            new ()
            {
                ClientId = "device",
                ClientName = "Device Flow ()",

                AllowedGrantTypes = GrantTypes.DeviceFlow,
                RequireClientSecret = false,

                AllowOfflineAccess = true,
                RefreshTokenUsage = TokenUsage.OneTimeOnly,
                RefreshTokenExpiration = TokenExpiration.Sliding,

                AllowedScopes = AllScopes,
            },
            
            // oidc login only
            new ()
            {
                ClientId = "login",

                RedirectUris = { "https://notused" },
                PostLogoutRedirectUris = { "https://notused" },

                AllowedGrantTypes = GrantTypes.Implicit,
                AllowedScopes = AllIdentityScopes,
            }

        #endregion
    };

    // client want to access resources (aka scopes)
    public static IEnumerable<Client> GetClients(IConfiguration configuration)
    {
        return new List<Client>

        {
            new ()
            {
                ClientId = "interactive.public",
                ClientName = "Interactive client (Code with PKCE)",

                RedirectUris = { "https://notused" },
                PostLogoutRedirectUris = { "https://notused" },

                RequireClientSecret = false,

                AllowedGrantTypes = GrantTypes.Code,
                AllowedScopes = new List<string>
                {
                    IdentityServerConstants.StandardScopes.OpenId,
                    IdentityServerConstants.StandardScopes.Profile,
                    IdentityServerConstants.StandardScopes.OfflineAccess,
                    //"webhooks"
                },

                AllowOfflineAccess = true,
                RefreshTokenUsage = TokenUsage.OneTimeOnly,
                RefreshTokenExpiration = TokenExpiration.Sliding
            },
            
            
            new ()
            {

                ClientId = "webapp",
                ClientName = "WebApp ()",
                ClientSecrets = new List<Secret>
                {
                    new Secret("secret".Sha256())
                },
                ClientUri = $"https://localhost:5211/",                             // public uri of the client
                AllowedGrantTypes = GrantTypes.Code,
                AllowAccessTokensViaBrowser = false,
                RequireConsent = false,

                AllowOfflineAccess = true,
                AlwaysIncludeUserClaimsInIdToken = true,
                RequirePkce = false,
                RedirectUris = new List<string>
                {
                    $"https://localhost:5211/signin-oidc"
                },
                PostLogoutRedirectUris = new List<string>
                {
                    $"https://localhost:5211/signout-callback-oidc",

              },
                AllowedScopes = new List<string>
                {
                    IdentityServerConstants.StandardScopes.OpenId,
                    IdentityServerConstants.StandardScopes.Profile,
                    IdentityServerConstants.StandardScopes.OfflineAccess,
                    //"webhooks"
                },
                AccessTokenLifetime = 60*60*2, // 2 hours
                IdentityTokenLifetime= 60*60*2 // 2 hours
            },
            new ()
            {
                ClientId = "webhooksclient",
                ClientName = "Webhooks ()",
                ClientSecrets = new List<Secret>
                {
                    new("secret".Sha256())
                },
                ClientUri = $"{configuration["WebhooksWebClient"]}",                             // public uri of the client
                AllowedGrantTypes = GrantTypes.Code,
                AllowAccessTokensViaBrowser = false,
                RequireConsent = false,
                AllowOfflineAccess = true,
                AlwaysIncludeUserClaimsInIdToken = true,
                RedirectUris = new List<string>
                {
                    $"{configuration["WebhooksWebClient"]}/signin-oidc"
                },
                PostLogoutRedirectUris = new List<string>
                {
                    $"{configuration["WebhooksWebClient"]}/signout-callback-oidc"
                },
                AllowedScopes = new List<string>
                {
                    IdentityServerConstants.StandardScopes.OpenId,
                    IdentityServerConstants.StandardScopes.Profile,
                    IdentityServerConstants.StandardScopes.OfflineAccess,
                    "webhooks"
                },
                AccessTokenLifetime = 60*60*2, // 2 hours
                IdentityTokenLifetime= 60*60*2 // 2 hours
            },
        };
    }
}
