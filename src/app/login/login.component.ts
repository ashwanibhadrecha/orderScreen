import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../_services/authentication.service';
import { ToastrService } from 'ngx-toastr';
AuthService;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  LoginForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toast: ToastrService
  ) {
    this.LoginForm = this.fb.group({
      loginkey: ['', Validators.required],
    });
  }
  login() {
    this.authService.login(this.LoginForm.value.loginkey).subscribe((res) => {
      if (res.status_code === 200) {
        this.toast.success(res.message, 'Success!');
        this.router.navigate(['/order']);
      } else {
        this.toast.error(res.message, 'Error!');
      }
    });
  }
}
