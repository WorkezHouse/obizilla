import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { NavbarComponent } from '../../../../shared/navbar/navbar.component';
import { SidebarComponent } from '../../../../shared/sidebar/sidebar.component';
import { AuthService } from '../../../../shared/Service/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [NavbarComponent, SidebarComponent, FormsModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements AfterViewInit {
  newName: string = '';
  newEmail: string = '';
  currentPassword: string = '';
  newPassword: string = '';

  originalName: string = ''; // Armazena o nome original
  originalEmail: string = ''; // Armazena o email original

  @ViewChild('pwHolder') pwHolder!: ElementRef;
  @ViewChild('resetPw') resetPw!: ElementRef;
  @ViewChild('mailHolder') mailHolder!: ElementRef;
  @ViewChild('changeMail') changeMail!: ElementRef;
  @ViewChild('nameHolder') nameHolder!: ElementRef;
  @ViewChild('changeName') changeName!: ElementRef;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // Puxar os dados do usuário logado quando o componente for carregado
    this.authService.getLoggedInUser().then(user => {
      if (user) {
        this.newName = user.full_name ?? ''; // Fornece um valor padrão se user.name for undefined
        this.newEmail = user.email ?? ''; // Fornece um valor padrão se user.email for undefined
        this.originalName = user.full_name ?? ''; // Fornece um valor padrão se user.name for undefined
        this.originalEmail = user.email ?? ''; // Fornece um valor padrão se user.email for undefined
      } else {
        console.error('Erro ao carregar os dados do usuário logado');
      }
    }).catch(error => {
      console.error('Erro ao buscar usuário:', error);
    });
  }

  ngAfterViewInit() {
    // Verificar se os elementos foram carregados
    console.log('pwHolder:', this.pwHolder);
    console.log('resetPw:', this.resetPw);
  }

  // Funções de alteração de visualização de elementos
  changeMailActive() {
    if (this.mailHolder && this.changeMail) {
      this.mailHolder.nativeElement.style.display = 'none';
      this.changeMail.nativeElement.style.display = 'flex';
    }
  }

  changeNameActive() {
    if (this.nameHolder && this.changeName) {
      this.nameHolder.nativeElement.style.display = 'none';
      this.changeName.nativeElement.style.display = 'flex';
    }
  }

  changePwActive() {
    if (this.pwHolder && this.resetPw) {
      this.pwHolder.nativeElement.style.display = 'none';
      this.resetPw.nativeElement.style.display = 'flex';
    }
  }

  // Função para salvar alterações
  async saveChanges() {
    try {
      // Verifica se o nome foi alterado
      if (this.newName !== this.originalName) {
        await this.authService.updateUserName(this.newName);
        this.originalName = this.newName; // Atualiza o valor original
      }

      // Verifica se o email foi alterado
      if (this.newEmail !== this.originalEmail) {
        await this.authService.updateUserEmail(this.newEmail);
        this.originalEmail = this.newEmail; // Atualiza o valor original
      }

      // Verifica se a senha foi alterada
      if (this.newPassword && this.currentPassword) {
        const isCurrentPasswordValid = await this.authService.verifyCurrentPassword(this.currentPassword);
        if (isCurrentPasswordValid) {
          await this.authService.updateUserPassword(this.newPassword);
          // Limpar campos de senha após a alteração
          this.currentPassword = '';
          this.newPassword = '';
        } else {
          console.error('Senha atual inválida');
        }
      }

      console.log('Alterações salvas com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar alterações:', error);
    }
  }
}
