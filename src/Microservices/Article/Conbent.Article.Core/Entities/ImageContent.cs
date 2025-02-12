using System.ComponentModel.DataAnnotations.Schema;
using Conbent.Article.Core.Entities.Contractors;

namespace Conbent.Article.Core.Entities;
public class ImageContent : ArticleStringContent
{
    [Column(TypeName = "bytea")]
    public required byte[] ContentBytes { get; set; }
    public string? Description { get; set; }
    public string? MimeType { get; set; }
    public string? Size { get; set; }
}
