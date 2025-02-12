namespace Conbent.UserInteraction.API.IntegrationEvents;

public interface IUserIntegrationEventService
{
    Task SaveEventAndUserContextChangesAsync(IntegrationEvent evt);
    Task PublishThroughEventBusAsync(IntegrationEvent evt);
}
