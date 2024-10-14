import { Injectable } from '@angular/core';
import { environments } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../Models/Cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private url = environments.API;

  constructor(private http: HttpClient) { }

  getAllClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.url}Clientes/GetAllClientes`);
  }

}
