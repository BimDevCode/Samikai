using Conbent.UserInteraction.API.Data;
using Conbent.UserInteraction.API.IntegrationEvents.Events;

namespace Conbent.UserInteraction.API.IntegrationEvents.EventHandling;

public class ArticleLikedIntegrationEventHandler(
    InteractiveUserContext interactiveUserContext,
    IUserIntegrationEventService UserIntegrationEventService,
    ILogger<ArticleLikedIntegrationEventHandler> logger) :
    IIntegrationEventHandler<ArticleLikedIntegrationEvent>
{
    public async Task Handle(ArticleLikedIntegrationEvent @event)
    {
        logger.LogInformation("Handling integration event: {IntegrationEventId} - ({@IntegrationEvent})", @event.Id, @event);

        var message = @event.Message;
        var user = @event.UserId;
        await interactiveUserContext.SaveChangesAsync();
    }
}
