import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import {ApiService} from '../../servicios/api/api.service';
import {AlertasService} from '../../servicios/alertas/alertas.service';
import {Router, ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrl: './nuevo.component.css'
})
export class NuevoComponent implements OnInit {

  nuevoForm= new FormGroup({
    id: new FormControl(''),
    productName: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    unitPrice: new FormControl('', Validators.required),
    stock: new FormControl('', Validators.required)
});

  constructor( private api: ApiService,
    private router: Router,
    private alertas:AlertasService) {}
  ngOnInit(): void {
  }

  addNew(productData: any) {
    this.api.addProduct(productData).subscribe(response => {
      this.alertas.showSucces('Datos Agregados Correctamente','Exito');
          this.router.navigate(['dashboard']);
    }, error => {
      console.error('Error al agregar el producto', error);
    });
  }
  salir(){
    this.router.navigate(['dashboard']);
  }
}
