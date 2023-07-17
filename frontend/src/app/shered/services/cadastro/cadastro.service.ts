import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from 'src/app/enviroment/enviroment';

@Injectable({
  providedIn: 'root',
})
export class CadastroService {
  private env: enviroment = new enviroment();
  constructor(private http: HttpClient) {}

  salvarUsuario(model: any): Observable<any> {
    return this.http.post<any>(this.env.url + `users`, model);
  }
}
