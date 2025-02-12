using Conbent.Article.API.Services.Contractors;
using Conbent.Article.Infrastructure.Context;

namespace Conbent.Article.API.Services;

//public sealed class ArticleIntegrationEventService(ILogger<ArticleIntegrationEventService> logger,
//    IEventBus eventBus,
//    ArticleContext interactiveUserContext,
//    IIntegrationEventLogService integrationEventLogService)
//    : IArticleIntegrationEventService, IDisposable
//{
//    private volatile bool _disposedValue;

//    public async Task PublishThroughEventBusAsync(IntegrationEvent evt)
//    {
//        try
//        {
//            logger.LogInformation("Publishing integration event: {IntegrationEventId_published} - ({@IntegrationEvent})", evt.Id, evt);

//            //await integrationEventLogService.MarkEventAsInProgressAsync(evt.Id);
//            await eventBus.PublishAsync(evt);
//            //await integrationEventLogService.MarkEventAsPublishedAsync(evt.Id);
//        }
//        catch (Exception ex)
//        {
//            logger.LogError(ex, "Error Publishing integration event: {IntegrationEventId} - ({@IntegrationEvent})", evt.Id, evt);
//            await integrationEventLogService.MarkEventAsFailedAsync(evt.Id);
//        }
//    }

//    public async Task SaveEventAndUserContextChangesAsync(IntegrationEvent evt)
//    {
//        logger.LogInformation("ArticleIntegrationEventService - Saving changes and integrationEvent: {IntegrationEventId}", evt.Id);

//        //Use of an EF Core resiliency strategy when using multiple DbContexts within an explicit BeginTransaction():
//        //See: https://docs.microsoft.com/en-us/ef/core/miscellaneous/connection-resiliency            
//        await ResilientTransaction.New(interactiveUserContext).ExecuteAsync(async () =>
//        {
//            // Achieving atomicity between original User database operation and the IntegrationEventLog thanks to a local transaction
//            await interactiveUserContext.SaveChangesAsync();
//            await integrationEventLogService.SaveEventAsync(evt, interactiveUserContext.Database.CurrentTransaction);
//        });
//    }

//    private void Dispose(bool disposing)
//    {
//        if (!_disposedValue)
//        {
//            if (disposing)
//            {
//                (integrationEventLogService as IDisposable)?.Dispose();
//            }

//            _disposedValue = true;
//        }
//    }

//    public void Dispose()
//    {
//        Dispose(disposing: true);
//        // ReSharper disable once GCSuppressFinalizeForTypeWithoutDestructor
//        GC.SuppressFinalize(this);
//    }
//}
