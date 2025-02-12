import { IBaseEntity } from "./contractors/IBaseEntity";

export interface UserEntity {
  surname: string;
  email: string;
  password: string;
  role: string;
  createDateTime: string;
}
export class UserEntity implements UserEntity, IBaseEntity {
  id: number = 0;
  name: string = "Mikalai Sabaleuski";
}
