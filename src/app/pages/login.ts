import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone:true,
  imports: [CommonModule,FormsModule],
  templateUrl: './login.html',
})
export class LoginComponent {
username = '';

constructor(public auth:AuthService,private router:Router){}

login(){
  if(this.username.trim()){
    this.auth.login(this.username.trim());
    this.router.navigate(['/']);
  }
}

logout() {
  this.auth.logout();
  this.router.navigate(['/login']);
}


// loginAsUser(){
//   this.auth.loginAs('Invitado','user');
//   this.router.navigate(['/']);
// }

// loginAsAdmin(){
//   this.auth.loginAs('Admin','admin');
//   this.router.navigate(['/']);
// }
}
