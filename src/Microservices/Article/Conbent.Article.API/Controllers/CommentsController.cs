using AutoMapper;
using Conbent.Article.API.Controllers.Contractors;
using Conbent.Article.API.DTOs;
using Conbent.Article.Core.Entities;

using Microsoft.AspNetCore.Mvc;
using Conbent.CommonInfrastructure.Contractors;
using Conbent.Article.Core.Specifications;
using Conbent.Article.Core.Specifications.Parameters;
using Conbent.CommonInfrastructure.Models;
using static System.Runtime.InteropServices.JavaScript.JSType;
using String = System.String;
using Conbent.Domain.DatabaseModel.Contractors;

namespace Conbent.Article.API.Controllers;

public class CommentsController(
    IGenericRepository<ArticleEntity> articlesRepo,
    IGenericRepository<Comment> commentsRepo,
    IMapper mapper)
    :BaseApiController
{
    // POST: api/Comments
    [HttpPost]
    public async Task<ActionResult> PostComment(CommentDto commentDto)
    {
        commentDto.CreatedAt = DateTime.UtcNow;
        var comment = mapper.Map<Comment>(commentDto);
        comment.ArticleName = commentDto.PostName;
        if (comment is null) return BadRequest("Comment is null");
        var article = await articlesRepo.GetByIdAsync(comment.ArticleId);
        await commentsRepo.AddAsync(comment);

        if (article is null) return Ok();
        article.Comments ??= [];
        article.Comments.Add(comment);
        await articlesRepo.UpdateAsync(article);
        return Ok();
    }

    [HttpGet("GetCommentsByUser/{userId}")]
    public async Task<ActionResult<IEnumerable<CommentDto>>> GetUserComments(string userId)
    {
        if(string.IsNullOrEmpty(userId)) 
            return BadRequest("User id is null or empty");
        var comments = await commentsRepo.ListAllWhere(x => x.UserId == userId);
        var data = mapper.Map<IReadOnlyList<CommentDto>>(comments);
        return Ok(data.ToArray());
    }
}