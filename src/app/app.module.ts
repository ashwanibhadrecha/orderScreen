import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { SettingComponent } from './setting/setting.component';
import { OrderService } from './_services/order.service';
import { OdersComponent } from './oders/oders.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './_services/authentication.service';
import { ToastrModule } from 'ngx-toastr'; // Import ToastrModule
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SettingComponent,
    OdersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    ToastrModule.forRoot(),
  ],
  providers: [OrderService, AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
