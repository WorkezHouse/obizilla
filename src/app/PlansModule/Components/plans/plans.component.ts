import { Component, OnInit, ViewChild } from '@angular/core';
import { NavbarComponent } from '../../../../shared/navbar/navbar.component';
import { SidebarComponent } from '../../../../shared/sidebar/sidebar.component';
import { AuthService } from '../../../../shared/Service/auth.service'; // Importe o AuthService para gerenciar o usuário
import { NgIf } from '@angular/common';
import { ToastComponent } from '../../../../shared/toast/toast.component';

@Component({
  selector: 'app-plans',
  standalone: true,
  imports: [NavbarComponent, SidebarComponent, NgIf,ToastComponent],
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss']
})
export class PlansComponent implements OnInit {
  sidebarVisible: boolean = false;
  @ViewChild(ToastComponent) toast!: ToastComponent;



  constructor(private authService: AuthService) { }

  ngOnInit() {
    // Obter os IDs dos planos do Supabase ao carregar o componente
  }


  showToast(message: string, type: 'success' | 'error' | 'info') {
    this.toast.message = message;
    this.toast.type = type;
    this.toast.show = true;
    setTimeout(() => this.toast.hideToast(), 3000);
  }
}
