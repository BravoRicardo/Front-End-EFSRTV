import { Injectable } from '@angular/core';
import {LoginI} from '../../modelos/login.interface';
import {ResponseI} from '../../modelos/response.interface';
import {ListaproductosI} from '../../modelos/listaproductos.interface';
import { ProductoI } from '../../modelos/producto.interface';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, from} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url:String ="http://localhost:8081/api/v1/product";


  constructor(private http:HttpClient) { }

  loginByEmail(form:LoginI):Observable<ResponseI>{
    
    let direccion = this.url + "/auth";
    return this.http.post<ResponseI>(direccion,form);
  }

  getAllProductos(): Observable<ListaproductosI[]>{
    
    let direccion = this.url + "/findAll";
    return this.http.get<ListaproductosI[]>(direccion);
  }

  getProducto(nombre:any):Observable<ProductoI>{
    let direccion = `${this.url}/findByProductName/${nombre}`;
    return this.http.get<ProductoI>(direccion)
 }

  putProducto(form:ProductoI): Observable<any>{
    let direccion = this.url + "/update";
    return this.http.put<any>(direccion, form);
  }

  deleteProducto(form: ProductoI): Observable<ResponseI> {
    const direccion = `${this.url}/delete/${form.id}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.delete<any>(direccion, options);
  }
  
  addProduct(form:ProductoI) :Observable<ResponseI>{
    let direccion = this.url + "/add";
    return this.http.post<ResponseI>(direccion,form)
  }


}
