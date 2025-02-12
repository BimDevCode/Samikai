import { IBaseEntity } from "./contractors/IBaseEntity";

export class ArticleMetaDataEntity implements IBaseEntity{
  id: number = 0;
  name: string = 'Base Entity';
  constructor(id: number = 0, name: string = 'Base Entity') {
    this.id = id;
    this.name = name;
  }
}
