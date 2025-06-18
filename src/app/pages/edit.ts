import { Component } from '@angular/core';
import { Post } from '../models/post.model';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PostService } from '../services/post.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit',
  standalone:true,
  imports: [CommonModule,RouterLink,FormsModule],
  templateUrl: './edit.html',
})
export class EditComponent {
post?: Post;

constructor(
  private route:ActivatedRoute,
  private router:Router,
  private postService:PostService,
){}

ngOnInit():void{
  const id = Number(this.route.snapshot.paramMap.get('id'));
  const found = this.postService.getById(id);
  if(!found){
    this.router.navigate(['/']);
  }else{
    this.post = {...found};
  }
}

saveChanges(){
  if(this.post){
    this.postService.updatePost(this.post);
    this.router.navigate(['/post', this.post.id]);
  }
}
}
