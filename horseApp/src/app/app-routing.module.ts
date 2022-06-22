import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './auth-guard.service';
import { HorseAddComponent } from './horse-add/horse-add.component';
import { HorseListComponent } from './horse-list/horse-list.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent},
  { path: 'login', component: LoginComponent},
  { path: 'list', component: HorseListComponent, canActivate: [AuthGuardService] },
  { path: 'add', component: HorseAddComponent, canActivate: [AuthGuardService] },
  { path: 'add/:id', component: HorseAddComponent, canActivate: [AuthGuardService] },
  { path: '**', component: MainComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
