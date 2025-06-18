import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home';
import { PostDetailComponent } from './pages/post-detail';
import { WriteComponent } from './pages/write';
import { EditComponent } from './pages/edit';
import { LoginComponent } from './pages/login';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'post/:id', component: PostDetailComponent },
  {path: 'write', component:WriteComponent},
  {path: 'edit/:id', component:EditComponent},
  {path:'login', component:LoginComponent},
  { path: '**', redirectTo: '' },
  
];
