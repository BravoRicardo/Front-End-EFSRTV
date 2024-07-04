import { Component } from '@angular/core';
import {AlertasService} from '../../servicios/alertas/alertas.service';
import {Router, ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  isLoggedIn = false;

  constructor(private alertas: AlertasService, private router: Router) { }

  onLogout() {
    this.isLoggedIn = false;
    this.alertas.showSucces(`Cierre de sesión`, 'Se ha cerrado su sesión');
    this.router.navigate(['login']);
  }
}
