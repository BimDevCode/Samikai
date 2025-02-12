using Conbent.Article.Core.Entities.Contractors;
using Conbent.Article.Core.Enums;

namespace Conbent.Article.Core.Entities;

public class CodeSnippetEntity : ArticleStringContent
{
    public required CodeLanguage CodeLanguage { get; set; } = CodeLanguage.Undefined;
    public bool IsSecurityRequired { get; set; } = false;
}
