namespace Conbent.Article.Core.Specifications.Parameters;
public class ArticleSpecParams
{
    #region Page

    private const int MaxPageSize = 50;
    public int PageIndex { get; set; } = 1;

    private int _pageSize = 14;
    public int PageSize
    {
        get => _pageSize;
        set => _pageSize = value > MaxPageSize ? MaxPageSize : value;
    }

    #endregion

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

    public int? TechnologyId { get; set; }
    public int? TagId { get; set; }
    public string? TagName { get; set; }

    #endregion
}
