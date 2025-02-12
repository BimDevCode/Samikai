// Copyright (c) Duende Software. All rights reserved.
// See LICENSE in the project root for license information.


namespace IdentityServerHost.Quickstart.UI;

public class CreateInputModel
{
    [Required]
    public string Username { get; set; }

    [Required]
    public string Password { get; set; }

    public string Name { get; set; }
    public string Email { get; set; }

    public string ReturnUrl { get; set; } = string.Empty;

}