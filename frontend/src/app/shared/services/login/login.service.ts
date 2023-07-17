import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from 'src/app/enviroment/enviroment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private env: enviroment = new enviroment();
  constructor(private http: HttpClient) {}

  login(model: any): Observable<any> {
    return this.http.post<any>(this.env.url + `auth/login`, model);
  }
}
