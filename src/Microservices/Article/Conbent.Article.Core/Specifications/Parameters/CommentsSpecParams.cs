namespace Conbent.Article.Core.Specifications.Parameters;
public class CommentsSpecParams
{
    #region Custom Search
    public string? Sort { get; set; }

    private string? _search;
    public string? Search
    {
        get => _search;
        set
        {
            if (value != null) _search = value.ToLower();
        }
    }

    #endregion

    #region Embedded Parameters

    public string? UserName { get; set; }
    public string? UserId { get; set; }

    #endregion
}
