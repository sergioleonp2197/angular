import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PostService } from '../services/post.service';
import { Post, Comment as PostComment } from '../models/post.model';
import { CommentService } from '../services/comment.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

declare var bootstrap: any;

@Component({
  selector: 'app-post-detail',
  standalone:true,
  imports: [CommonModule,RouterLink,FormsModule],
  templateUrl: './post-detail.html',
  styleUrl: './post-detail.scss'
})
export class PostDetailComponent implements OnInit{
post?: Post;
comments: PostComment[] = [];
  newComment = '';
  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private router: Router,
    private commentService:CommentService,
    public auth:AuthService
  ){}

  ngOnInit(): void{
    const id = Number(this.route.snapshot.paramMap.get('id'))
    this.post = this.postService.getById(id);
    if (this.post) {
      this.comments = this.commentService.getByPost(this.post.id);
    }
  }
  onDelete() {
  if (!this.post) return;

  const confirmed = confirm(`¿Estás seguro de eliminar el post: "${this.post.title}"?`);
  if (confirmed) {
    this.postService.deletePost(this.post.id);
    this.router.navigate(['/']);
  }
}
confirmDelete() {
  if (!this.post) return;
  this.postService.deletePost(this.post.id);
  // Cerrar modal con Bootstrap (manualmente)
  const modal = bootstrap.Modal.getInstance(document.getElementById('deleteModal')!);
  modal?.hide();
  this.router.navigate(['/']);
}

filterByTag(tag: string) {
  this.router.navigate(['/'], { queryParams: { search: tag } });
}
likePost() {
  if (this.post) {
    this.postService.incrementLikes(this.post.id);
    this.post = this.postService.getById(this.post.id); // refrescar
  }
}

  addComment() {
    if (!this.post || !this.newComment.trim()) return;

    const comment: PostComment = {
      postId: this.post.id,
      author: localStorage.getItem('user') || 'Anónimo',
      content: this.newComment.trim(),
      createdAt: new Date()
    };

    this.commentService.add(comment);
    this.comments.push(comment);
    this.newComment = '';
  }


}
