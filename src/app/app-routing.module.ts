import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SettingComponent } from './setting/setting.component';
import { OdersComponent } from './oders/oders.component';
import { AuthGuard } from './_guards/auth.guard';
const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'setting',
    component: SettingComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'order',
    component: OdersComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
