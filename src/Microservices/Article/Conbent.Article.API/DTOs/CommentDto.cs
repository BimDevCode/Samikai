
namespace Conbent.Article.API.DTOs;

public class CommentDto
{
    public int Id { get; set; }
    public int PostId { get; set; }
    public string Author { get; set; }
    public string PostName { get; set; }
    public int AuthorId { get; set; }
    public string UserId { get; set; }
    public string Content { get; set; }
    public DateTime CreatedAt { get; set; }
}