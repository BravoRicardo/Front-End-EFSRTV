import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../servicios/api/api.service';
import {Router} from '@angular/router';

import {ListaproductosI} from '../../modelos/listaproductos.interface';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  
  productos: ListaproductosI[] = [];
  /*agregando para Scroll*/
  page = 0;
  size = 10;
  hasMore = true;
  totalProductos = 0;

  constructor( private api:ApiService, private router:Router){}

  ngOnInit(): void {
    this.api.getAllProductos().subscribe((data) => {
      this.productos = data;
      this.totalProductos = data.length;
      this.loadMore();
    });
  }

  getSubset(): ListaproductosI[] {
    return this.productos.slice(this.page * this.size, (this.page + 1) * this.size);
  }
  
  loadMore(): void {
    if (this.page * this.size >= this.totalProductos) {
    this.hasMore = false;
    return;
  }
    this.page++;
}


  editarProducto(nombre:any){
    this.router.navigate(['editar',nombre]);
  }

  nuevoProducto(){
    this.router.navigate(['nuevo']);
  }

  exportPdf(): void {
    const tablaElement = document.getElementById('TablaProductos');
  
    if (tablaElement) {
      html2canvas(tablaElement).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        pdf.addImage(imgData, 'PNG', 15, 15, 180, 180);
        pdf.save('TablaProductos.pdf');
      });
    } else {
      console.error('No se encontró el elemento de la tabla con el id "TablaProductos".');
    }
  }
}
