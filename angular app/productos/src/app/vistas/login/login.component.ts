import { Component, OnInit } from '@angular/core';

import {FormGroup,FormControl,Validators} from '@angular/forms'

import { UsuarioService } from '../../servicios/api/usuario.service';

import {Router, ActivatedRoute} from '@angular/router'
import {AlertasService} from '../../servicios/alertas/alertas.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    usuario: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required)
  })

  constructor(private usuarioService: UsuarioService, private router: Router, private alertas:AlertasService) {}

  ngOnInit(): void { 
  }

  onLogin(form: any) {
    this.usuarioService.obtenerUsuarios().subscribe(
      (data) => {
        const usuarios = data;
        let usuarioEncontrado = false;
  
        for (const usuario of usuarios) {
          if (form.usuario === usuario.nombre && form.password === usuario.contraseña) {
            this.alertas.showSucces(`Bienvenido, ${usuario.nombre}`, 'Inicio de sesión exitoso');
            this.router.navigate(['dashboard']);
            usuarioEncontrado = true;
            break;
          }
        }
  
        if (!usuarioEncontrado) {
          this.alertas.showError('Credenciales incorrectas', 'Error de inicio de sesión');
        }
      },
      (error) => {
        console.error('Error al obtener los usuarios', error);
        this.alertas.showError('Error de servidor', 'Error de inicio de sesión');
      }
    );
  }
}
