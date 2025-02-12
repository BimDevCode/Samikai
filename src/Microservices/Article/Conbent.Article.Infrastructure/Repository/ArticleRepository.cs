using Conbent.Article.Core.Entities;
using Conbent.Article.Core.Interfaces;
using Conbent.Article.Infrastructure.Context;
using Microsoft.EntityFrameworkCore;

namespace Conbent.Article.Infrastructure.Repository;
public class ArticleRepository(ArticleContext context) : IArticleRepository
{
    public async Task<ArticleEntity> GetArticleByIdAsync(int id)
    {
        return await context.Articles
            .Include(p => p.Technology)
            .Include(p => p.Tags)
            .Include(p => p.Texts)
            .Include(p => p.Images)
            .Include(p => p.Comments)
            .Include(p => p.Author)
            .FirstOrDefaultAsync(x => x.Id == id) ?? throw new NullReferenceException("Cant retrieve article " +
            "by id from database");
    }

    public async Task<IReadOnlyList<ArticleEntity>> GetArticlesAsync()
    {
        return await context.Articles
            .Include(p => p.Technology)
            .Include(p => p.Tags)
            .Include(p => p.Texts)
            .Include(p => p.Images)
            .Include(p => p.Author)
            .ToListAsync();
    }

    public async Task<IReadOnlyList<Technology>> GetArticleTechnologiesAsync()
    {
        return await context.Technologies.ToListAsync();
    }
}
