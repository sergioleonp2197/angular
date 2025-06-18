import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PostService } from '../services/post.service';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-write',
  standalone:true,
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './write.html',
  styleUrl: './write.scss'
})
export class WriteComponent {
title ='';
excerpt ='';
content = '';
author = '';
tagsInput = '';

constructor(private postService:PostService, private router:Router, private auth:AuthService){}


createPost(){

  const tags = this.tagsInput
  .split(',')
  .map(tag => tag.trim())
  .filter(tag => tag!== '')


  const newPost = {
    id: Date.now(),
    title: this.title,
    excerpt: this.excerpt,
    content: this.content,
    author: this.auth.getUser()??'anonimo',
    createdAt: new Date(),
    tags,
  };
  console.log('Post  creado', newPost);
  this.postService.addPost(newPost);
  this.router.navigate(['/'])
}
}
