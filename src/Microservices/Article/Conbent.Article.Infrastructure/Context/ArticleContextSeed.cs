using Conbent.Article.Core.Entities;
using Conbent.Article.Infrastructure.Parser;
using Conbent.CommonInfrastructure.Helpers;
using System.Runtime.InteropServices;
using Conbent.Article.Core.Enums;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;

namespace Conbent.Article.Infrastructure.Context;

public abstract class ArticleContextSeed
{
    private static readonly string ObsidianNotesPath =
        RuntimeInformation.IsOSPlatform(OSPlatform.Windows) ? ObsidianNotesPathWindows :
        RuntimeInformation.IsOSPlatform(OSPlatform.Linux) ? ObsidianNotesPathLinuxOs :
        ObsidianNotesPathMacOs;

    private const string ObsidianNotesPathWindows = @"W:\Obsidian\Conbent\Conbent Development\Content";
    private const string ObsidianNotesPathMacOs = "/Users/mikalaisabaleuski";
    private const string ObsidianNotesPathLinuxOs = "ArticleSource";
    private const string SearchPattern = "*" + SourceFileExtension;
    private const string SourceFileExtension = ".md";
    private const string MasterAuthor = "Mikalai Sabaleuski";
    private static readonly Dictionary<Guid, Tag> HashTags = new();
    private static AuthorEntity? _masterAuthorName;
    private static Technology? _baseTechnology;
    private static MarkdownParser? _markdownParser;

    protected ArticleContextSeed()
    {
        _markdownParser = new MarkdownParser();
        _masterAuthorName = new AuthorEntity()
        {
            Name = MasterAuthor,
            HashId = MasterAuthor.ComputeGuidHash()
        };
        _baseTechnology = new Technology() { Name = "WebTechnology", HashId = "WebTechnology".ComputeGuidHash() };
    }

    public static async Task SeedAsync(ArticleContext context)
    {
        var markdownContents = new List<ArticleEntity>();
        _markdownParser = new MarkdownParser();
        _masterAuthorName = new AuthorEntity()
        {
            Name = MasterAuthor,
            HashId = MasterAuthor.ComputeGuidHash()
        };
        _baseTechnology = new Technology() { Name = "WebTechnology", HashId = "WebTechnology".ComputeGuidHash() };
        ScanDirectoryForArticleEntity(ObsidianNotesPath, ref markdownContents);
        context.Articles.AddRange(markdownContents);
        if (context.ChangeTracker.HasChanges()) await context.SaveChangesAsync();
    }

    private static void ScanDirectoryForArticleEntity(
        string directoryPath,
        ref List<ArticleEntity> markdownContents)
    {
        try
        {
            var ind = 0;
            // Recursively process all subdirectories
            var isExist = Directory.Exists(directoryPath);
            Console.WriteLine($"Processing directory {directoryPath} is exists {isExist}");
            if (!isExist) throw new DirectoryNotFoundException($"Directory for parsing {directoryPath} not found");
            var subDirectories = Directory.GetDirectories(directoryPath);
            Console.WriteLine($"Get subdirectories {subDirectories}");
            if (subDirectories.Any())
            {
                foreach (var subDirectory in subDirectories)
                    ScanDirectoryForArticleEntity(subDirectory, ref markdownContents);
            }

            var subFiles = Directory.GetFiles(directoryPath, SearchPattern);
            // Process all files in the current directory
            foreach (var filePath in subFiles)
            {
                var relativePath = Path.GetRelativePath(ObsidianNotesPath, filePath);

                var articleEntity = new ArticleEntity()
                {
                    Name = Path.GetFileNameWithoutExtension(filePath),
                    HashId = Path.GetFileNameWithoutExtension(filePath).ComputeGuidHash(),
                    RelevantScore = ind,
                    TreePath = relativePath,
                    Author = _masterAuthorName!,
                    Technology = _baseTechnology!,
                    Liked = 0,
                    Disliked = 0,
                    Comments = [],
                    IssueStatus = IssueStatus.Issued
                };
                ind++;
                var tags = relativePath.Split('\\')
                    .Where(x => !x.Contains(SourceFileExtension))
                    .Select(t => new Tag()
                        { Name = t, HashId = t.ComputeGuidHash(), Description = t }).ToList();

                var staticObjectTags = new HashSet<Tag>();
                foreach (var tag in tags)
                    ProcessTag(tag, ref staticObjectTags);

                var textBlock = new List<TextContent>();
                var codeSnippetBlock = new List<CodeSnippetEntity>();
                var articleTags = new List<Tag>();

                var typeSequence =
                    _markdownParser?.ParseMarkdown(filePath, out textBlock, out codeSnippetBlock, out articleTags);
                _markdownParser?.Clear();

                if (articleTags.Any())
                    articleTags.ForEach(x => ProcessTag(x, ref staticObjectTags));

                textBlock.ForEach(t => t.Article = articleEntity);
                codeSnippetBlock.ForEach(t => t.Article = articleEntity);

                articleEntity.ContentBlockTypeSequence = typeSequence!;
                articleEntity.Tags = staticObjectTags;
                articleEntity.Texts = textBlock;
                articleEntity.CodeSnippets = codeSnippetBlock;

                markdownContents.Add(articleEntity);
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error scanning directory {directoryPath}: {ex.Message}, {ex.StackTrace}");
        }
    }

    private static void ProcessTag(Tag tag, ref HashSet<Tag> staticObjectTags)
    {
        if (HashTags.TryGetValue(tag.HashId, out var value))
            staticObjectTags.Add(value);
        else
        {
            HashTags.Add(tag.HashId, tag);
            staticObjectTags.Add(tag);
        }
    }
}
//xcopy "W:\Obsidian\Conbent\Conbent Development\Content" "C:\Startup\GitConbent\src\Microservices\Article\Conbent.Article.API\ArticleSource" /E /I /H