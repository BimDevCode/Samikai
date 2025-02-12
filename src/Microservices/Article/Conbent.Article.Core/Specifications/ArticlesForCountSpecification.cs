using Conbent.Article.Core.Entities;
using Conbent.Article.Core.Specifications.Parameters;
using Conbent.CommonInfrastructure.Contractors;
using Conbent.Domain.DatabaseModel.Storage;

namespace Conbent.Article.Core.Specifications;

public class ArticlesForCountSpecification(ArticleSpecParams articleParams) : BaseSpecification<ArticleEntity>(x =>
    (string.IsNullOrEmpty(articleParams.Search) || x.Name.ToLower().Contains(articleParams.Search)) &&
    (string.IsNullOrEmpty(articleParams.TagName) || x.TreePath.ToLower().Contains(articleParams.TagName.ToLower())) &&
    (!articleParams.TechnologyId.HasValue || x.TechnologyId == articleParams.TechnologyId) && 
    (!articleParams.TagId.HasValue || (x.Tags!.FirstOrDefault(a => a.Id == articleParams.TagId) != null))
);
