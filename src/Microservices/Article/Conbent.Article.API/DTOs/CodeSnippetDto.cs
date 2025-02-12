
namespace Conbent.Article.API.DTOs;

public class CodeSnippetDto
{
    public int Id { get; set; }
    public string? CodeLanguage { get; set; } = string.Empty;
    public  string? Name { get; set; } = string.Empty;
    public  string? Content { get; set; } = string.Empty;
    public  bool IsSecurityRequired { get; set; }
}