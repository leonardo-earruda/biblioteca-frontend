import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CLIENT_HEADER } from 'src/app/configs/http-header.const';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  public url = `${environment.baseUrl}/oauth/token`;

  loginAutorizacao(username: string, password: string): Observable<any> {
    const body = `username=${username}&password=${password}&grant_type=password`;
    return this.http.post<any>(this.url, body, { headers: CLIENT_HEADER, withCredentials: true });
  }
}
