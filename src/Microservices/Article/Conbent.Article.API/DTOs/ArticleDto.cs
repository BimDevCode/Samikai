using Conbent.Article.Core.Entities;

namespace Conbent.Article.API.DTOs;

public class ArticleDto
{
    public int Id { get; set; }
    public  string? Name { get; set; }
    public  string? AuthorNameSurname { get; set; }
    public  string? HashId { get; set; }
    public  decimal RelevantScore { get; set; }
    public int TechnologyId { get; set; }
    public string? Tag { get; set; }
    public int? Disliked { get; set; }
    public int? Liked { get; set; }
    public string CreateDateTime { get; set; }
    public string? TreePath { get; set; } 
    public string? IssueStatus { get; set; }
    public ICollection<CommentDto>? Comments { get; set; }
    public ICollection<TagDto>? Tags { get; set; }
    public ICollection<string>? Texts { get; set; }
    public ICollection<CodeSnippetDto>? CodeSnippets { get; set; }
    public ICollection<string>? ContentTypeSequence { get; set; }
}