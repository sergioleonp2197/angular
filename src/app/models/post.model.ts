export interface Comment {
  author: string;
  content: string;
  createdAt: Date;
   postId: number;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  createdAt: Date;
  tags?: string[];
  likes?:number;
  comments?: Comment[];
}
