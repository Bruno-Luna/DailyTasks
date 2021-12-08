import { environment } from 'src/environments/environment.prod';
import { Usuario } from './../../model/Usuario';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/service/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  //info visitantes
  
  email_visitante: string = "visitante@email.com"
  senha_visitante: string = "visitante"

  user: Usuario = new Usuario

  constructor(
    private router: Router,
    private authService: AuthService,
    private alert: AlertService
  ) { }

  ngOnInit(): void {
    
  }

  entrar() {
    this.authService.login(this.user).subscribe((resp: Usuario) => {
      this.user = resp

      environment.token = this.user.token
      environment.nome = this.user.nome
      environment.id = this.user.id

      if (environment.token == null || environment.id == null) {
        this.alert.danger('Usuário ou senha incorretos!')
        this.authService.flag = false
      } else {
        this.authService.flag = true
        this.router.navigate(['/tasks'])
      }
    }, erro => {
        if(erro.status == 400){
          this.alert.danger('Por favor, preencha os campos.')
        }
    })
  }

  logarVisitante(){
    this.user.email = this.email_visitante
    this.user.senha = this.senha_visitante

    this.authService.login(this.user).subscribe((resp: Usuario) => {
      this.user = resp
      
    })
  }


}
