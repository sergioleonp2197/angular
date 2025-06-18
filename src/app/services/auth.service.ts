import { Injectable } from "@angular/core";

@Injectable({providedIn:'root'})
export class AuthService{
  private readonly STORAGE_KEY = 'medium_user';

  login(username:string):void{
    localStorage.setItem(this.STORAGE_KEY,username);
  }

  logout():void{
    localStorage.removeItem(this.STORAGE_KEY);
  }

  getUser():string | null{
    return localStorage.getItem(this.STORAGE_KEY);
  }

  isLoggedIn(): boolean{
    return this.getUser()!== null;
  }
}

// @Injectable({ providedIn: 'root' })
// export class AuthService {
//   private readonly STORAGE_KEY = 'medium_user';

//   login(username: string): void {
//     const role = username === 'admin' ? 'admin' : 'user';
//     const userData = { username, role };
//     localStorage.setItem(this.STORAGE_KEY, JSON.stringify(userData));
//   }

//   logout(): void {
//     localStorage.removeItem(this.STORAGE_KEY);
//   }

//   getUser(): { username: string; role: string } | null {
//     const data = localStorage.getItem(this.STORAGE_KEY);
//     return data ? JSON.parse(data) : null;
//   }

//   isLoggedIn(): boolean {
//     return this.getUser() !== null;
//   }

//   isAdmin(): boolean {
//     const user = this.getUser();
//     return user?.role === 'admin';
//   }
// }

