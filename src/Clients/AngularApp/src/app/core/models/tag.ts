import { IBaseEntity } from "./contractors/IBaseEntity";

export interface Tag {
  description: string;
}

export class Tag implements Tag, IBaseEntity {
  id: number = 0;
  name: string = 'Tag';
}
