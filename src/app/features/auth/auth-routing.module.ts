// src/app/features/auth/auth-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const routes: Routes = [
  {
    path: 'auth/login',  // Notez le chemin complet
    component: LoginComponent,
    data: { title: 'Connexion - Fashion' }
  },
  {
    path: 'auth/register',
    component: RegisterComponent,
    data: { title: 'Inscription - Fashion' }
  },
  {
    path: 'auth/forgot-password',
    component: ForgotPasswordComponent,
    data: { title: 'Mot de passe oublié - Fashion' }
  },
  // Ou si vous voulez un préfixe 'auth'
  /*
  {
    path: 'auth',
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ]
  }
  */
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }