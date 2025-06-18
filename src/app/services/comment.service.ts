import { Injectable } from '@angular/core';
import { Comment } from '../models/post.model';

const STORAGE_KEY = 'medium_comments';

@Injectable({ providedIn: 'root' })
export class CommentService {
  private comments: Comment[] = [];

  constructor() {
    const saved = localStorage.getItem(STORAGE_KEY);
    this.comments = saved ? JSON.parse(saved) : [];
  }

  private saveToStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.comments));
  }

  getByPost(postId: number): Comment[] {
    return this.comments.filter(c => c.postId === postId);
  }

  add(comment: Comment) {
    this.comments.push(comment);
    this.saveToStorage();
  }
}
