import { Component } from '@angular/core';
import { PostListComponent } from '../components/post-list';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PostService } from '../services/post.service';
import { Post } from '../models/post.model';
import { CommonModule } from '@angular/common';
import { CommentService } from '../services/comment.service';

@Component({
  selector: 'app-home',
  standalone:true,
  imports: [PostListComponent,RouterModule,FormsModule,CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class HomeComponent {
   onFocus: boolean = false;
posts: Post[] = [];
searchTerm = '';

constructor(
  private postService:PostService,
  private route:ActivatedRoute,
  private commentService: CommentService
){}
ngOnInit():void{
this.posts = this.postService.getAll();
this.route.queryParams.subscribe(params => {
this.searchTerm = params['search'] || '';
  });
}

get filteredPosts(): Post[] {
  const term = this.searchTerm.toLowerCase();
  return this.posts.filter(post =>
    post.title.toLowerCase().includes(term) ||
    post.author.toLowerCase().includes(term) ||
    post.tags?.some(tag => tag.toLowerCase().includes(term))
  );
}

getCommentCount(postId:number):number{
  return this.commentService.getByPost(postId).length;
}


filterByTag(tag: string) {
  this.searchTerm = tag;
}

get latestPosts(): Post[] {
  return this.posts
    .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
    .slice(0, 5); // últimos 5
}

}
