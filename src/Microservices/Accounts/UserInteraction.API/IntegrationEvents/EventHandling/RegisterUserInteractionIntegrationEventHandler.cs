using Conbent.UserInteraction.API.Data;
using Conbent.UserInteraction.API.IntegrationEvents.Events;

namespace Conbent.UserInteraction.API.IntegrationEvents.EventHandling;

public class RegisterUserInteractionIntegrationEventHandler(
    InteractiveUserContext interactiveUserContext,
    IUserIntegrationEventService UserIntegrationEventService,
    ILogger<RegisterUserInteractionIntegrationEventHandler> logger) :
    IIntegrationEventHandler<RegisterUserInteractionIntegrationEvent>
{
    public async Task Handle(RegisterUserInteractionIntegrationEvent @event)
    {
        logger.LogInformation("Handling integration event: {IntegrationEventId} - ({@IntegrationEvent})", @event.Id, @event);

        var message = @event.Message;
        var user = @event.UserId;
        await interactiveUserContext.SaveChangesAsync();
    }
}
