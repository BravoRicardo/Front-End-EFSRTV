import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url = 'assets/usuarios.json';

  constructor(private http: HttpClient) { }

  obtenerUsuarios(): Observable<any> {
    return this.http.get(this.url);
  }
}