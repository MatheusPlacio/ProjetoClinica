import { environments } from './../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateUser } from '../Models/CreateUser';
import { Observable } from 'rxjs';
import { CreateUserResponse } from '../Models/CreateUserResponse';
import { AuthRequest } from '../auth/AuthRequest';
import { AuthResponse } from '../auth/AuthResponse';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  unique_name: string;
  // Adicione outros campos conforme necessário
}

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private url = environments.API_AUT;

  constructor(private http: HttpClient, private cookie: CookieService) { }

  CriarUsuario(requestDatas: CreateUser): Observable<CreateUserResponse> {
    return this.http.post<CreateUserResponse>(`${this.url}api/User/criar`, requestDatas);
  }

  authUser(requestDatas: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.url}api/User/autenticar`, requestDatas);
  }

  estaLogado(): boolean {
    const JWT_TOKEN = this.cookie.get('USER_INFO');
    return JWT_TOKEN ? true : false;
  }

  getUserNameFromToken(): string | null {
    const token = this.cookie.get('USER_INFO');
    if (token) {
      try {
        const decodedToken = jwtDecode<DecodedToken>(token);
        return decodedToken.unique_name;
      } catch (error) {
        console.error('Erro ao decodificar o token', error);
        return null;
      }
    }
    return null;
  }

}
