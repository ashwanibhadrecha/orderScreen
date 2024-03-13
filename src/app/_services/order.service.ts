
import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
    backendUrl = '';
    api = "/osd/v1/"
     headers = new HttpHeaders({
        'Authorization': 'FCN2M4E-Y3J4TNS-HD07D04-YEQWTTC',
        'UUID': '7b2a2a11-f0e4-4d57-8b40-7680f3afcd69'
      });
  constructor(private http: HttpClient) {
     this.backendUrl = environment.API_URL
   }
   getHeaders() {
    let headers = new HttpHeaders().set('authorization', environment.token)
      .set('uuid', environment.uuid);
    return { headers: headers }
  }
  getOrder(data:any) {
    return this.http.post<any>(`${this.backendUrl}${this.api}osd-getOrders`,data,this.getHeaders())
  }

}