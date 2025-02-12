using AutoMapper;
using Conbent.Article.API.Controllers.Contractors;
using Conbent.Article.API.DTOs;
using Conbent.Article.API.Services;
using Conbent.Article.Core.Entities;
using Conbent.Article.Core.Enums;
using Microsoft.AspNetCore.Mvc;

namespace Conbent.Article.API.Controllers;

public class ReactionsController(
    ReactionService reactionService,
    IMapper mapper)
    : BaseApiController
{
    //[Cached(600)]
    //[HttpPost("ReactedOnArticle")]
    //public async Task<ActionResult> PostReaction(ReactionDto reactionDto)
    //{
    //    var result = await reactionService.ReactToArticleAsync(reactionDto.ArticleId, "UserId is null now", reactionDto.Reaction);
    //    if (result)
    //        return Ok();
    //    return BadRequest("Unable to process the reaction.");
    //}

    [HttpPost("ReactedOnArticle")]
    public async Task<ActionResult> PostReaction(ReactionDto reactionDto)
    {
        await reactionService.ReactToArticleAsync(reactionDto);
        return Ok();
    }
}