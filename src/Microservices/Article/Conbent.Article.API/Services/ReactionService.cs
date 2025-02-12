using Microsoft.AspNetCore.SignalR;
using Conbent.Article.API.Hubs;
using Conbent.Article.API.IntegrationEvents.Events;
using Conbent.Article.Core.Entities;
using Conbent.Article.Core.Enums;
using Conbent.Article.Infrastructure.Context;
using Conbent.Article.API.Services.Contractors;
using Conbent.Article.API.DTOs;
using System;
using Conbent.CommonInfrastructure.Contractors;
using Microsoft.EntityFrameworkCore;
using Conbent.Domain.DatabaseModel.Contractors;

namespace Conbent.Article.API.Services;

public class ReactionService(
    IGenericRepository<ArticleEntity> articlesRepo,
    //IArticleIntegrationEventService articleIntegrationEventService,
    IGenericRepository<ReactionEntity> reactionRepo,
    IHubContext<ReactionHub> hubContext)
{
    public async Task<bool> ReactToArticleAsync(int articleId, string userId, Reaction reactionType)
    {
        //var existingReaction = await reactionRepo.ListAllAsync()
        //    .FirstOrDefaultAsync(ar => ar.ArticleId == articleId && ar.UserId == userId);

        //var isChanged = false;

        //if (existingReaction != null)
        //{
        //    if (existingReaction.Reaction == reactionType)
        //    {
        //        _context.ArticleReactions.Remove(existingReaction);
        //        isChanged = true; // Reaction was toggled off
        //    }
        //    else
        //    {
        //        existingReaction.Reaction = reactionType;
        //        _context.ArticleReactions.Update(existingReaction);
        //        isChanged = true; // Reaction was changed
        //    }
        //}
        //else
        //{
        //    var newReaction = new ReactionEntity
        //    {
        //        Articles = articleId,
        //        UserId = userId,
        //        Reaction = reactionType
        //    };
        //    _context.ArticleReactions.Add(newReaction);
        //    isChanged = true; // New reaction was added
        //}

        //await _context.SaveChangesAsync();

        //if (isChanged)
        //{
        //    Send a real - time notification to all clients
        //}
        await hubContext.Clients.All.SendAsync("ReceiveNotification",
            $"User {userId} has reacted to Article {articleId} with {reactionType}.");
        return true;
    }

    public async Task ReactToArticleAsync(ReactionDto reactionDto)
    {
        var existingArticle = await articlesRepo.GetByIdAsync(reactionDto.ArticleId);
        if (existingArticle == null) return;
        var reaction = Enum.Parse<Reaction>(reactionDto.Reaction);
        switch (reaction)
        {
            case Reaction.Like:
                 existingArticle.Liked++;
                 break;
            case Reaction.Dislike:
                 existingArticle.Disliked++;
                 break;
            case Reaction.Comment:
                break;
            case Reaction.Bookmark:
                break;
            case Reaction.Share:
                break;
            case Reaction.None:
                break;
            default:
                throw new ArgumentOutOfRangeException();
        }
        await articlesRepo.UpdateExistingAsync(existingArticle);
    }
}