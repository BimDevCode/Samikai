using Conbent.Article.Core.Entities;
using Conbent.Article.Core.Specifications.Parameters;
using Conbent.CommonInfrastructure.Contractors;
using Conbent.Domain.DatabaseModel.Storage;

namespace Conbent.Article.Core.Specifications;

public class CommentsByUserSpecification : BaseSpecification<Comment>
{
    public CommentsByUserSpecification(CommentsSpecParams comments)
        : base(x => 
        (string.IsNullOrEmpty(comments.Search) || x.Name.ToLower().Contains(comments.Search, StringComparison.InvariantCultureIgnoreCase)) &&
        (string.IsNullOrEmpty(comments.UserId) || x.UserId == comments.UserId) && 
        (string.IsNullOrEmpty(comments.UserName) || x.AuthorName == comments.UserName)
        )
    {
        AddInclude(x => x.UserId!);
        AddInclude(x => x.ArticleId);
        AddInclude(x => x.AuthorName!);
        AddInclude(x => x.AuthorSurname!);
        AddInclude(x => x.Content);
        AddOrderBy(x => x.CreatedAt);
    }

    public CommentsByUserSpecification(int id) : base(x => x.Id == id)
    {
        AddInclude(x => x.UserId!);
        AddInclude(x => x.ArticleId);
        AddInclude(x => x.AuthorName!);
        AddInclude(x => x.AuthorSurname!);
        AddInclude(x => x.Content);
        AddOrderBy(x => x.CreatedAt);
    }
}
