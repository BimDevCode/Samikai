import { Reaction } from "./enums/reaction";

// src/app/models/comment.model.ts
export interface ReactionDto {
  articleId: number;
  reaction : string,
  userId: string;
}
