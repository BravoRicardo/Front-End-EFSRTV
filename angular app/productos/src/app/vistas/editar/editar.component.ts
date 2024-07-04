import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router'
import {ProductoI} from '../../modelos/producto.interface';
import {ApiService} from '../../servicios/api/api.service';
import {AlertasService} from '../../servicios/alertas/alertas.service';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import { from } from 'rxjs';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrl: './editar.component.css'
})
export class EditarComponent implements OnInit {

  constructor(private activerouter: ActivatedRoute, 
              private router:Router,
              private api:ApiService,
              private alertas:AlertasService){
  }


  datosProducto:ProductoI | undefined;
  editarForm= new FormGroup({
    id: new FormControl('null'),
    productName: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    unitPrice: new FormControl('', Validators.required),
    stock: new FormControl('', Validators.required)
});

  ngOnInit(): void {
    let productonombre = this.activerouter.snapshot.paramMap.get('nombre');
    console.log(productonombre);

    this.api.getProducto(productonombre).subscribe(data => {
      if (data) {
        this.datosProducto = data;

      const idValue: string = data.id || '';

        this.editarForm.patchValue({
          id: idValue,
          productName: data.productName,
          category: data.category,
          unitPrice: String(data.unitPrice),
          stock: String(data.stock)
        });
      // Mostrar los datos en la consola por si desea revisar
    console.log('ID:', idValue);
    console.log('Nombre del Producto:', data.productName);
    console.log('Categoría:', data.category);
    console.log('Precio Unitario:', data.unitPrice);
    console.log('Stock:', data.stock);
      }
    });
  }

  //Actualizar
  postForm(): void {
    const formValue = this.editarForm.value as ProductoI;
  
    // Asegurarte de que todos los campos necesarios tengan un valor válido
    if (formValue.id && formValue.productName && formValue.category && formValue.unitPrice && formValue.stock) {
      this.api.putProducto(formValue).subscribe(data => {
          this.alertas.showSucces('Datos Modificados Correctamente','Exito');
          this.router.navigate(['dashboard']);
        console.log(data);
      });
    }
  }
  
  //Eliminar
  eliminar(): void {
    const formValue = this.editarForm.value as ProductoI;
  
    if (formValue.id) {
      this.api.deleteProducto(formValue).subscribe(data => {
          this.alertas.showSucces('Producto Eliminado Correctamente','Hecho');
          this.router.navigate(['dashboard']);
        console.log(data);
      });
    }
  }
  
  salir(){
    this.router.navigate(['dashboard']);
  }

}
