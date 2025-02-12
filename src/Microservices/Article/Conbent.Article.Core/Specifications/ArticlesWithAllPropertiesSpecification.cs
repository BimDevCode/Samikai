using Conbent.Article.Core.Entities;
using Conbent.Article.Core.Specifications.Parameters;
using Conbent.CommonInfrastructure.Contractors;
using Conbent.Domain.DatabaseModel.Storage;

namespace Conbent.Article.Core.Specifications;

public class ArticlesWithAllPropertiesSpecification : BaseSpecification<ArticleEntity>
{
    public ArticlesWithAllPropertiesSpecification(ArticleSpecParams articleParams) : base(x =>
        (string.IsNullOrEmpty(articleParams.Search) || x.Name.ToLower().Contains(articleParams.Search)) &&
        (string.IsNullOrEmpty(articleParams.TagName) || x.TreePath.ToLower().Contains(articleParams.TagName.ToLower())) &&
        (!articleParams.TechnologyId.HasValue || x.TechnologyId == articleParams.TechnologyId) && 
        (!articleParams.TagId.HasValue || (x.Tags!.FirstOrDefault(a => a.Id == articleParams.TagId) != null))
        )
    {
        AddInclude(x => x.Comments!);
        AddInclude(x => x.Technology);
        AddInclude(x => x.Texts!);
        AddInclude(x => x.Tags!);
        AddInclude(x => x.Author);
        AddOrderBy(x => x.Name);
        ApplyPaging(articleParams.PageSize * (articleParams.PageIndex - 1), articleParams.PageSize);

        if (string.IsNullOrEmpty(articleParams.Sort)) return;
        switch (articleParams.Sort)
        {
            case "dateAsc":
                AddOrderBy(p => p.CreateDateTime);
                break;
            case "dateDesc":
                AddOrderByDescending(p => p.CreateDateTime);
                break;
            default:
                AddOrderBy(n => n.Name);
                break;
        }
    }

    public ArticlesWithAllPropertiesSpecification(int id) : base(x => x.Id == id)
    {
        AddInclude(x => x.Technology);
    }
}
