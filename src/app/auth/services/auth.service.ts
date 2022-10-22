import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of, tap, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthReponse, Usuario } from '../interfaces/authInterfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = environment.baseUrl;
  private _usuario?: Usuario;

  get usuario() {
    return { ...this._usuario };
  }
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http
      .post<AuthReponse>(`${this.baseUrl}/auth`, { email, password })
      .pipe(
        tap((resp) => {
          if (resp.ok) {
            localStorage.setItem('token', resp.token!);
            this._usuario = { uid: resp.uid!, name: resp.name! };
          }
        }),
        map((resp) => resp.ok),
        catchError((err) => of(err.error.msg))
      );
  }

  renovarSession(): Observable<boolean> {
    const headers = new HttpHeaders().set(
      'x-token',
      localStorage.getItem('token') ?? ''
    );

    console.log('valor headers', headers);

    return this.http
      .get<AuthReponse>(`${this.baseUrl}/auth/renew`, { headers })
      .pipe(
        tap((resp) => (this._usuario = { name: resp.name!, uid: resp.uid! })),
        map(resp => resp.ok),
        catchError(error => of(false))
      );
  }
}
