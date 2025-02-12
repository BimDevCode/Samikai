import { ArticleEntity } from "./articleEntity";
import { IBaseEntity } from "./contractors/IBaseEntity";
import { Tag } from "./tag";

interface IssueStatus {
    label: string;
    value: string;
}
export interface IProject {
    description?: string;
    gitLink?: string;
    issueStatus?: IssueStatus;
    category?: string;
    articles?: ArticleEntity[];
    representArticle?: ArticleEntity;
    route?: string;
    technology?: string;
    text?: string;
    image?: string;
    tag?: Tag;
}

export class Project implements IProject, IBaseEntity {
    id: number = 0;
    representArticle!: ArticleEntity;
    name: string = "Project";
    gitLink?: string;
    articles?: ArticleEntity[] = [];
    tag?: Tag;
    description?: string;
    text?: string = "Consectetur magna velit sint dolore. Consectetur velit fugiat laborum quis cupidatat cupidatat duis enim quis consectetur est ut. Et fugiat veniam do quis ipsum proident ea. Mollit est eiusmod id adipisicing ut elit id proident reprehenderit sint nisi exercitation. Ea magna amet cillum aliquip amet ipsum reprehenderit labore ipsum officia enim.";
    route?: string = "/";
    issueStatus?: IssueStatus;
    category?: string;
    technology?: string;
    image?: string = "assets/images/project.png";
}
