import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { isPlatformBrowser } from '@angular/common';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  backendUrl = '';
  api = '/pos/v1/';
  headers = new HttpHeaders({
    Authorization: 'FCN2M4E-Y3J4TNS-HD07D04-YEQWTTC',
    UUID: '7b2a2a11-f0e4-4d57-8b40-7680f3afcd69',
  });
  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: any
  ) {
    this.backendUrl = environment.API_URL;
  }
  getHeaders() {
    let headers = new HttpHeaders()
      .set('authorization', environment.token)
      .set('uuid', environment.uuid);
    return { headers: headers };
  }
  login(loginkey: string) {
    return this.http
      .post<any>(
        `${this.backendUrl}${this.api}get-location`,
        {
          location_key: loginkey,
        },
        this.getHeaders()
      )
      .pipe(
        tap((response) => {
          localStorage.setItem('currentUser', JSON.stringify(response));
        })
      );
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.clear();
  }

  getCurrentUser() {
    return localStorage.getItem('currentUser');
  }

  isLoggedIn() {
    //return !!localStorage.getItem('currentUser');
    if (isPlatformBrowser(this.platformId)) {
      // Check if the code is running in the browser environment
      return !!localStorage.getItem('currentUser');
    }
    // Return false if running on the server (SSR)
    return false;
  }
}
