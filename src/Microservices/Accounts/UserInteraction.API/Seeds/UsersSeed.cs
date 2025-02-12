
using System.Linq;
using Conbent.UserInteraction.API.Data;
using Conbent.UserInteraction.API.Models;

namespace Conbent.UserInteraction.API.Seeds;

public class UsersSeed(ILogger<InteractiveUser> logger, InteractiveUserContext interactiveUserContext) : IDbSeeder<InteractiveUserContext>
{
    public async Task SeedAsync(InteractiveUserContext context)
    {
        var alice = await interactiveUserContext.Users.FindAsync("alice");
        if (alice == null)
        {
            alice = new InteractiveUser
            {
                Id= "alice",
                CardHolderName = "Alice Smith",
                CardNumber = "4012888888881881",
                CardType = 1,
                InnerHashId = Guid.NewGuid().ToString(),
                City = "Redmond",
                Country = "U.S.",
                Expiration = "12/24",
                ExternalUserId = Guid.NewGuid().ToString(),
                LastName = "Smith",
                Name = "Alice",
                ZipCode = "98052",
                State = "WA",
                Street = "15703 NE 61st Ct",
                SecurityNumber = "123"
            };

            _ = await interactiveUserContext.Users.AddAsync(alice);
           

            if (logger.IsEnabled(LogLevel.Debug))
            {
                logger.LogDebug("alice created");
            }
        }
        else
        {
            if (logger.IsEnabled(LogLevel.Debug))
            {
                logger.LogDebug("alice already exists");
            }
        }

        var bob = await interactiveUserContext.Users.FindAsync("bob");

        if (bob == null)
        {
            bob = new InteractiveUser
            {
                Id= "bob",
                CardHolderName = "Bob Smith",
                CardNumber = "4012888888881881",
                CardType = 1,
                City = "Redmond",
                InnerHashId = Guid.NewGuid().ToString(),
                Country = "U.S.",
                Expiration = "12/24",
                ExternalUserId = Guid.NewGuid().ToString(),
                LastName = "Smith",
                Name = "Bob",
                ZipCode = "98052",
                State = "WA",
                Street = "15703 NE 61st Ct",
                SecurityNumber = "456"
            };

            _ = await interactiveUserContext.Users.AddAsync(bob);

            if (logger.IsEnabled(LogLevel.Debug))
            {
                logger.LogDebug("bob created");
            }
        }
        else
        {
            if (logger.IsEnabled(LogLevel.Debug))
            {
                logger.LogDebug("bob already exists");
            }
        }
        if(interactiveUserContext.ChangeTracker.HasChanges()) await interactiveUserContext.SaveChangesAsync();
    }
}
