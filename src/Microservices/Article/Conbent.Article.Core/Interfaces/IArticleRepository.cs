using Conbent.Article.Core.Entities;

namespace Conbent.Article.Core.Interfaces;
public interface IArticleRepository
{
    Task<ArticleEntity> GetArticleByIdAsync(int id);
    Task<IReadOnlyList<ArticleEntity>> GetArticlesAsync();
    Task<IReadOnlyList<Technology>> GetArticleTechnologiesAsync();
}