import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';


const STORAGE_KEY = 'medium_posts';

@Injectable({ providedIn: 'root' })
export class PostService {
  addPost(post:Post){
    post.likes = post.likes ?? 0;
    this.posts.unshift(post);
    this.saveToStorage();
  }

  private posts: Post[] = [];

  constructor(){
    const saved = localStorage.getItem(STORAGE_KEY);
    this.posts = saved ? JSON.parse(saved) : this.getDefaultPosts();
  }

  private getDefaultPosts(): Post[]{
return[
      {
      id: 1,
      title: 'Anunciando Angular 20',
      content: 'Texto completo del post...',
      excerpt: 'Descubre las novedades de Angular 20.',
      author: 'Admin',
      createdAt: new Date('2025-05-10'),
      tags:['Angular','Novedades']
    },
    {
      id: 2,
      title: 'Errores comunes con Signals',
      content: 'Texto completo del post...',
      excerpt: 'Evita estos errores al usar Signals.',
      author: 'DesarrolladorX',
      createdAt: new Date('2025-06-01'),
      tags:['Angular','Signals','Errores']
    }
]
  }

  private saveToStorage(){
    localStorage.setItem(STORAGE_KEY,JSON.stringify(this.posts));
  }

  getAll(): Post[] {
    return [...this.posts];
  }

  getById(id: number): Post | undefined {
    return this.posts.find(p => p.id === id);
  }

  updatePost(update:Post){
    const index = this.posts.findIndex(p => p.id === update.id);
    if(index > -1){
      this.posts[index] = {...update};
      this.saveToStorage();
    }
  }
    deletePost(id: number) {
  this.posts = this.posts.filter(p => p.id !== id);
  this.saveToStorage();
}

incrementLikes(id: number) {
  const post = this.getById(id);
  if (post) {
    post.likes = (post.likes || 0) + 1;
    this.saveToStorage();
  }
}

updateComment(postId:number, commentId:number,newText:string){
  const post = this.getById(postId);
  if(post && post.comments){
    const comment = post.comments.find(c=> c.postId === commentId);
    if (comment) {
      comment.content =newText;
      this.saveToStorage()
    }
  }
}

  
}
