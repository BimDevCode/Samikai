namespace Conbent.Article.API.IntegrationEvents.Events;

public record ArticleLikedIntegrationEvent(string UserId, string UserName, string Message);// : IntegrationEvent;
