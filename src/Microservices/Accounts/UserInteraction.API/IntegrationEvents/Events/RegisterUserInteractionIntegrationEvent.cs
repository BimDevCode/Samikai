
namespace Conbent.UserInteraction.API.IntegrationEvents.Events;

public record RegisterUserInteractionIntegrationEvent(string UserId, string UserName, string Message) : IntegrationEvent;
