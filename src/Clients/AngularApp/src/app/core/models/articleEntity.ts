import { CodeSnippet } from "./codeSnippet";
import { ArticleMetaDataEntity } from "./articleMetaDataEntity";
import { Tag } from "./tag";
import { ContentType } from "./enums/contentType";
import { CommentDto } from "./comment.model";

export interface ArticleEntity {
  texts: string[];
  codeSnippets: CodeSnippet[];
  contentTypeSequence: ContentType[];
  tags: Tag[];
  relevantScore: number;
  treePath: string ;
  createDateTime : string ;
  authorNameSurname : string ;
  liked: number;
  disliked: number;
}

export class ArticleEntity implements ArticleEntity, ArticleMetaDataEntity {
  id: number = 0;
  tags: Tag[] = [
    Object.assign(new Tag(), {id:0, description: 'C#'}), 
    Object.assign(new Tag(), {id:1, description: 'Dotnetcore'}), 
    Object.assign(new Tag(), {id:2, description: 'Conbent'})];
  name: string = 'ArticleEntity';
  treePath: string = 'Conbent/Dotnetcore';
  createDateTime : string = Date.now().toString();
  relevantScore: number = 0;
  authorNameSurname: string = "Mikalai Sabaleuski";
  texts: string[] = ['Sint in exercitation velit commodo. Amet reprehenderit laborum adipisicing duis officia. Nostrud sit enim excepteur irure elit eiusmod. Pariatur commodo in magna duis eiusmod aute ut cupidatat.', 'Sint in exercitation velit commodo. Amet reprehenderit laborum adipisicing duis officia. Nostrud sit enim excepteur irure elit eiusmod. Pariatur commodo in magna duis eiusmod aute ut cupidatat.'];
  codeSnippets: CodeSnippet[] = [
    Object.assign(new CodeSnippet(), {id:0, content: 'C#'}), 
    Object.assign(new CodeSnippet(), {id:1, content: 'Dotnetcore'}), 
    Object.assign(new CodeSnippet(), {id:2, content: 'Conbent'})];
  comments: CommentDto[] = [];
  contentTypeSequence: ContentType[] = [ContentType.Text];
  liked: number = 0;
  disliked: number = 0;
}