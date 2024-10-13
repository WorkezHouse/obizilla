import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../shared/Service/auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-formulario',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login-formulario.component.html',
  styleUrls: ['./login-formulario.component.scss'] // Corrigi aqui
})
export class LoginFormularioComponent implements OnInit {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService,private router: Router) {}

  async ngOnInit() {}

  // Chama o método de login do serviço de autenticação
  async login() {
    const data = await this.authService.login(this.email, this.password);
    if (data) {
      console.log('Login bem-sucedido:', data);
      this.router.navigate(['/chat']);

    } else {
      console.error('Erro no login.');
    }

  }

  // Chama o método de registro do serviço de autenticação
  async signUp() {
    const data = await this.authService.signUp(this.email, this.password);
    if (data) {
      console.log('Registro bem-sucedido:', data);
    } else {
      console.error('Erro no registro.');
    }
  }

  // Chama o método de logout do serviço de autenticação
  async logout() {
    await this.authService.logout();
    console.log('Logout bem-sucedido!');
  }
}
