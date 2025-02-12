using AutoMapper;
using Conbent.Article.API.Controllers.Contractors;
using Conbent.Article.API.DTOs;
using Conbent.Article.Core.Entities;
using Conbent.Article.Core.Specifications;
using Conbent.CommonInfrastructure.Errors;
using Conbent.CommonInfrastructure.Helpers;
using Conbent.CommonInfrastructure.Models;
using Microsoft.AspNetCore.Mvc;
using System.Linq.Expressions;
using Conbent.CommonInfrastructure.Contractors;
using Conbent.Article.Core.Specifications.Parameters;
using Conbent.Domain.DatabaseModel.Contractors;

namespace Conbent.Article.API.Controllers;

public class ArticlesController(
    IGenericRepository<ArticleEntity> articlesRepo,
    IGenericRepository<Technology> technologyRepo,
    IGenericRepository<Tag> tagRepo,
    IGenericRepository<ReactionEntity> reactionRepo,
    IMapper mapper)
    :BaseApiController
{
    //[Cached(600)]
    [HttpGet]
    public async Task<ActionResult<Pagination<ArticleDto>>> GetArticles(
        [FromQuery] ArticleSpecParams articleParams)
    {
        var spec = new ArticlesWithAllPropertiesSpecification(articleParams);
        var countSpec = new ArticlesForCountSpecification(articleParams);

        var totalItems = await articlesRepo.CountWithSpecAsync(countSpec);
        var articles = await articlesRepo.ListWithSpecAsync(spec);

        var data = mapper.Map<IReadOnlyList<ArticleDto>>(articles);

        return Ok(new Pagination<ArticleDto>(articleParams.PageIndex,
            articleParams.PageSize, totalItems, data));
    }

    //[Cached(600)]
    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
    public async Task<ActionResult<ArticleDto>> GetArticle(int id)
    {
        var includes = new List<Expression<Func<ArticleEntity, object>>>{
            article => article.Texts!,
            article => article.Tags!,
            article => article.Comments!,
            article => article.Author!,
            article => article.CodeSnippets!,
            article => article.Images!
        };
        var article = await articlesRepo.GetByIdAsync(id, includes);
        if (article is null) return NotFound(new ApiResponse(404));
        var articleDto = mapper.Map<ArticleEntity, ArticleDto>(article);
        return articleDto;
    }

    [HttpGet("UserName/{userName}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
    public async Task<ActionResult<IReadOnlyList<ArticleDto>>> GetArticlesByName(string userName)
    {
        var articles = await articlesRepo.ListAllWhere(x => x.Author.Name == userName);
        if (articles is null) return NotFound(new ApiResponse(404));
        var data = mapper.Map<IReadOnlyList<ArticleDto>>(articles);
        return Ok(data);
    }

    [HttpGet("HashId/{name}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
    public async Task<ActionResult<ArticleDto>> GetArticle(string name)
    {
        var includes = new List<Expression<Func<ArticleEntity, object>>>{
            article => article.Texts!,
            article => article.Tags!,
            article => article.Author!,
            article => article.Comments!,
            article => article.CodeSnippets!,
            article => article.Images!
        };
        var article = await articlesRepo.GetByHashNameAsync(name.ComputeGuidHash(), includes);
        if (article is null) return NotFound(new ApiResponse(404));
        var articleDto = mapper.Map<ArticleEntity, ArticleDto>(article);
        return articleDto;
    }

    //[Cached(600)]
    [HttpGet("AllTechnologies")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<IReadOnlyList<Technology>>> GetAllTechnologies()
    {
        return Ok(await technologyRepo.ListAllAsync());
    }

    [HttpGet("AllTags")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<IReadOnlyList<Tag>>> GetAllTags()
    {
        return Ok(await tagRepo.ListAllAsync());
    }

    [HttpGet("AllPaths")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<string>> GetPaths()
    {
        return Ok(await articlesRepo.GetAllPropertyAsync(x => x.TreePath));
    }

    [HttpGet("AllReactions")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<string>> GetAllReactions()
    {
        return Ok(await reactionRepo.ListAllAsync());
    }
}