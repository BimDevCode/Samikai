using Conbent.Article.API.IntegrationEvents.Events;
using Conbent.Article.API.Services.Contractors;
using Conbent.Article.Infrastructure.Context;

namespace Conbent.Article.API.IntegrationEvents.EventHandling;

public class ArticleLikedIntegrationEventHandler(
    ArticleContext interactiveUserContext,
    IArticleIntegrationEventService ArticleIntegrationEventService,
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
