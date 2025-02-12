using Conbent.Article.API.Services;
using Microsoft.AspNetCore.SignalR;

namespace Conbent.Article.API.Hubs;

public class ReactionHub(ReactionService reactionService) : Hub
{
    public async Task SendNotification(string message)
    {
    }
}