using AutoMapper;
using Conbent.Article.API.DTOs;
using Conbent.Article.Core.Entities;
using System.Globalization;

namespace Conbent.Article.API.Helpers;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<ArticleEntity, ArticleDto>()
            .ForMember(d => d.Texts, o 
                => o.MapFrom(s => s.Texts!.Select(x => x.Content)))
            .ForMember(d => d.AuthorNameSurname, o
                => o.MapFrom(s => s.Author.Name))
            .ForMember(d => d.ContentTypeSequence, o
                => o.MapFrom(s => s.ContentBlockTypeSequence.Select(x => x.ToString())))
            .ForMember(d => d.IssueStatus, o
                => o.MapFrom(s => s.IssueStatus.ToString()))
            .ForMember(d => d.Comments, o
                => o.MapFrom(s => s.Comments!.Select(x => new CommentDto() { Id = x.Id, Content = x.Content, PostName = x.ArticleName, PostId = x.ArticleId, Author = x.AuthorName +' '+ x.AuthorSurname, CreatedAt = x.CreatedAt, UserId =x.UserId})))
            .ForMember(d => d.CreateDateTime, o
                => o.MapFrom(s => s.CreateDateTime.ToString("dd MMMM yyyy", CultureInfo.InvariantCulture)))
            .ForMember(d => d.CodeSnippets, o
                => o.MapFrom(s => s.CodeSnippets!.Select(x => new CodeSnippetDto(){ Id = x.Id, Name = x.Name, CodeLanguage = x.CodeLanguage.ToString(), Content = x.Content, IsSecurityRequired = x.IsSecurityRequired})))
            .ForMember(d => d.Tags, o
                => o.MapFrom(s => s.Tags!.Select(x => new TagDto(){Id = x.Id, Name = x.Name})))
            .ReverseMap();

        CreateMap<Comment, CommentDto>()
            .ForMember(c => c.Author, 
                o => o.MapFrom(s => s.AuthorName+' '+s.AuthorSurname))
            .ForMember(c => c.UserId,
                o => o.MapFrom(s => s.UserId))
            .ForMember(c => c.PostName,
                o => o.MapFrom(s => s.ArticleName))
            .ForMember(c => c.PostId,
                o => o.MapFrom(s => s.ArticleId)).AfterMap((s, d) =>
            {
                if (!string.IsNullOrEmpty(s.ArticleName)) return;
                if(!string.IsNullOrEmpty(d.PostName))
                    s.ArticleName = d.PostName;
            }); ;

        CreateMap<ReactionEntity, ReactionDto>()
            .ForMember(c => c.Reaction,
                o => o.MapFrom(s => s.Reaction.ToString()))
            .ReverseMap(); 

        CreateMap<CommentDto, Comment>()
            .ForMember(c => c.AuthorName,
                o => o.MapFrom(s => s.Author))
            .ForMember(c => c.UserId,
                o => o.MapFrom(s => s.UserId))
            .ForMember(c => c.ArticleId,
                o => o.MapFrom(s => s.PostId))
            .AfterMap((s, d) =>
            {
                // Custom logic to be executed after the mapping
                // You can access the source object 's' and the destination object 'd' here
                // Perform any additional operations or transformations as needed
            });
    }
}