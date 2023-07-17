import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { enviroment } from 'src/app/enviroment/enviroment';

@Injectable({
  providedIn: 'root',
})
export class FilmeService {
  private env: enviroment = new enviroment();
  constructor(private http: HttpClient) {}

  inserirLike(model: any): Observable<any> {
    const header = this.getHeader();
    return this.http.post<any>(this.env.url + `movies`, model, {
      headers: header,
    });
  }

  listarFilmes(): Observable<any> {
    const header = this.getHeader();
    return this.http.get<any>(this.env.url + `movies?page=1&itemPerPage=10`, {
      headers: header,
    });
  }

  listarFilmesLike(): Observable<any> {
    const header = this.getHeader();
    return this.http.get<any>(
      this.env.url + `movies/likes?page=1&itemPerPage=10`,
      {
        headers: header,
      }
    );
  }

  getHeader() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return headers;
  }
}
