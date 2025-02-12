import { IBaseEntity } from "./contractors/IBaseEntity";
import { CodeLanguageEnum } from "./enums/codeLanguageEnum";

export interface CodeSnippet {
  codeLanguage: CodeLanguageEnum ;
  content: string ;
  isSecurityRequired: boolean ; 
} 

export class CodeSnippet implements CodeSnippet, IBaseEntity {
  id: number = 0;
  name: string = 'CodeSnippet';
  codeLanguage: CodeLanguageEnum = CodeLanguageEnum.Undefined;
  content: string = 'Sint in exercitation velit commodo. Amet reprehenderit laborum adipisicing duis officia. Nostrud sit enim excepteur irure elit eiusmod. Pariatur commodo in magna duis eiusmod aute ut cupidatat.';
  isSecurityRequired: boolean = false; 
}
