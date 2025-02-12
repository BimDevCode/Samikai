using System.Text;
using System.Text.RegularExpressions;
using Conbent.Article.Core.Entities;
using Conbent.Article.Core.Enums;
using Conbent.CommonInfrastructure.Helpers;

namespace Conbent.Article.Infrastructure.Parser;

public  class MarkdownParser
{
    private const string CodeBlockDelimiter = "```";
    private const char TagIndicator = '#';
    private const string LanguageTag = "#ProgramLanguage";

    private List<ContentBlockType>? ContentBlockTypes { get; set; } = [];

    private ContentBlockType _typeBlock = ContentBlockType.Undefined;
    private ContentBlockType TypeBlock
    {
        get => _typeBlock;
        set
        {
            if (_typeBlock == value) return;
            _typeBlock = value;
            OnIsInCodeBlockChanged(value);
        }
    }

    private void OnIsInCodeBlockChanged(ContentBlockType contentBlockType)
    {
        switch (contentBlockType)
        {
            case ContentBlockType.CodeSnippet:
                ContentBlockTypes!.Add(ContentBlockType.CodeSnippet);
                break;
            case ContentBlockType.Text:
                ContentBlockTypes!.Add(ContentBlockType.Text);
                break;
            case ContentBlockType.Image:
                ContentBlockTypes!.Add(ContentBlockType.Image);
                break;
            case ContentBlockType.Undefined:
                break;
        }
    }

    public void Clear()
    {
        TypeBlock = ContentBlockType.Undefined;
        ContentBlockTypes = new List<ContentBlockType>();
    }

    public ContentBlockType[] ParseMarkdown(string filePath, out List<TextContent> textBlocks, out List<CodeSnippetEntity> codeSnippets, out List<Tag> tags)
    {
        if (!File.Exists(filePath))
            throw new FileNotFoundException($"The file {filePath} does not exist.");

        textBlocks = new List<TextContent>();
        codeSnippets = new List<CodeSnippetEntity>();
        tags = new List<Tag>();

        try
        {
            var content = File.ReadAllText(filePath);
            var codeLanguage = GetCodeLanguage(content);
            tags = ExtractTags(content);

            var lines = content.Split(["\r\n", "\r", "\n"], StringSplitOptions.None);

            var currentTextBlock = new StringBuilder();
            var currentCodeSnippet = new StringBuilder();

            foreach (var line in lines)
            {
                if (line.Trim().StartsWith(CodeBlockDelimiter))//Enter or exit to code block
                    ProcessCodeBlockDelimiter(currentTextBlock, currentCodeSnippet, textBlocks, codeSnippets, codeLanguage);
                else if (TypeBlock == ContentBlockType.CodeSnippet) //still in code block
                    ProcessCodeLine(line, currentCodeSnippet);
                else //still in text block
                    ProcessTextLine(line, currentTextBlock);
            }
            // Add any remaining text block if present
            AddTextBlock(currentTextBlock, textBlocks);//still in text block
        }
        catch (Exception ex)
        {
           
        }
        return ContentBlockTypes!.ToArray();
    }


    private void ProcessCodeBlockDelimiter(StringBuilder currentTextBlock, StringBuilder currentCodeSnippet, IList<TextContent> textBlocks, IList<CodeSnippetEntity> codeSnippets, CodeLanguage codeLanguage)
    {
        if (TypeBlock == ContentBlockType.CodeSnippet)
        {
            AddCodeSnippetBlock(currentCodeSnippet, codeSnippets, codeLanguage);//Close code snippet block
            TypeBlock = ContentBlockType.Text;//Open text block
        }
        else if (TypeBlock != ContentBlockType.CodeSnippet)
        {
            AddTextBlock(currentTextBlock, textBlocks);//Close text block
            TypeBlock = ContentBlockType.CodeSnippet;//Open code block
        }
    }

    private CodeLanguage GetCodeLanguage(string text)
    {
        try
        {
            var match = Regex.Match(text, @$"{LanguageTag}(\w+)");
            if (match.Success) return match.Groups[1].Value.ToLowerInvariant() switch
            {
                "csharp" => CodeLanguage.CSharp,
                "html" => CodeLanguage.HTML,
                "css" => CodeLanguage.CSS,
                "javascript" => CodeLanguage.JavaScript,
                "typescript" => CodeLanguage.TypeScript,
                "sql" => CodeLanguage.SQL,
                "terminalcommand" => CodeLanguage.TerminalCommand,
                _ => CodeLanguage.Undefined
            };
            return CodeLanguage.Undefined;
        }
        catch 
        {
            return CodeLanguage.Undefined;
        }
    }

    private List<Tag> ExtractTags(string content)
    {
        var tags = new List<Tag>();
        try
        {
            var matches = Regex.Matches(content, @$"(?<!{LanguageTag})\#\w+");
            var tagMatches = matches.Where(x => !x.Value.Contains(LanguageTag)).Select(m => m.Value.Replace("#", "")).ToArray();
            tags.AddRange(tagMatches.Select(match => new Tag() { Name = match, Description = match, HashId = match.ComputeGuidHash() }));
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
        }
        return tags;
    }

    private void ProcessCodeLine(string line, StringBuilder currentCodeBlock)
    {
        if (line.TrimStart().StartsWith(CodeBlockDelimiter)) return;
        currentCodeBlock.AppendLine(line);
        TypeBlock = ContentBlockType.CodeSnippet;
    }
    private  void ProcessTextLine(string line, StringBuilder currentTextBlock)
    {
        if (line.TrimStart().StartsWith(TagIndicator)) return;
        currentTextBlock.AppendLine(line);
        TypeBlock = ContentBlockType.Text;
    }

    private  void AddTextBlock(StringBuilder currentTextBlock, IList<TextContent> textBlocks)
    {
        if (currentTextBlock.Length <= 0) return;
        var textString = currentTextBlock.ToString();
        if (textString.Length <= 0) return;
        var name = textString.Substring(0, textString.Length < 10 ? textString.Length-1 : 10);//First 10 symbols
        var textBlock = new TextContent { 
            Content = textString, 
            Name = name, 
            HashId = name.ComputeGuidHash()
            };
        textBlocks.Add(textBlock);
        currentTextBlock.Clear();
    }

    private static void AddCodeSnippetBlock(StringBuilder currentCodeSnippet, IList<CodeSnippetEntity> codeSnippets, CodeLanguage codeLanguage)
    {
        if (currentCodeSnippet.Length <= 0) return;
        var textString = currentCodeSnippet.ToString();
        if (textString.Length <= 0) return;
        var name = textString.Substring(0, textString.Length < 5 ? textString.Length - 1 : 5);//First 5 symbols
        var codeSnippetBlock = new CodeSnippetEntity { 
                    Content = textString, 
                    Name = name, 
                    HashId = name.ComputeGuidHash(),
                    CodeLanguage = codeLanguage
                    };
        codeSnippets.Add(codeSnippetBlock);
        currentCodeSnippet.Clear();
    }
}
