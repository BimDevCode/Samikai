// src/app/models/comment.model.ts
export interface CommentDto {
  postName: string;
  id: number;
  postId: number;
  author: string;
  authorId: number;
  userId: string;
  content: string;
  createdAt: Date;
}
