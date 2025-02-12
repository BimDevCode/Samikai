using Conbent.CommonInfrastructure.Contractors;
using Conbent.Domain.Common;

namespace Conbent.Article.Core.Entities;

public class AuthorEntity : BaseEntity, IBelongsUser
{
    //Name is a User Name(Not a Full Name)
    public string UserId {get; set; } = Guid.NewGuid().ToString();
}
