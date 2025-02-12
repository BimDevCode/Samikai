// Copyright (c) Duende Software. All rights reserved.
// See LICENSE in the project root for license information.

namespace Conbent.UserInteraction.API;

public static class Extensions
{

    internal static async Task<bool> GetSchemeSupportsSignOutAsync(this HttpContext context, string scheme)
    {
        var provider = context.RequestServices.GetRequiredService<IAuthenticationHandlerProvider>();
        var handler = await provider.GetHandlerAsync(context, scheme);
        return (handler is IAuthenticationSignOutHandler);
    }

 
    
}