import { IBaseEntity } from "./contractors/IBaseEntity";

export interface Technology {
  description: string;
}

export class Technology implements Technology, IBaseEntity {
  id: number = 0;
  name: string = 'Technology';
}
