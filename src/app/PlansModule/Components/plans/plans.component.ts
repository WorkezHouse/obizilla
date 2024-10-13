import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../../../shared/navbar/navbar.component';
import { SidebarComponent } from '../../../../shared/sidebar/sidebar.component';
import { AuthService } from '../../../../shared/Service/auth.service'; // Importe o AuthService para gerenciar o usuário
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-plans',
  standalone: true,
  imports: [NavbarComponent, SidebarComponent, NgIf],
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss']
})
export class PlansComponent implements OnInit {
  sidebarVisible: boolean = false;

  // Definir os planos como um array de objetos
  plans = [
    {
      name: 'Basic',
      description: 'Tudo o que você precisa para começar com uma IA poderosa e sem censura.',
      features: ['Interações 100% anônimas', 'Respostas poderosas sem censura', '10 prompts / dia'],
      price: 10,
      planId: '' // Inicialmente vazio, será preenchido com o ID correto
    },
    {
      name: 'Gold',
      description: 'Ideal para usuários frequentes que precisam de mais dados e flexibilidade.',
      features: ['100 prompts / dia', 'Consulta de dados CPF, Placas', 'Suporte prioritário'],
      price: 78,
      planId: '' // Inicialmente vazio, será preenchido com o ID correto
    }
  ];

  constructor(private authService: AuthService) { }

  ngOnInit() {
    // Obter os IDs dos planos do Supabase ao carregar o componente
    this.loadPlanIds();
  }

  // Carregar os IDs dos planos dinamicamente do Supabase
  async loadPlanIds() {
    try {
      const { data: plansData, error } = await this.authService.getPlans();
      if (error) {
        console.error('Erro ao buscar planos:', error);
        return;
      }

      if (plansData && plansData.length > 0) {
        const basicPlan = plansData.find((plan: { name: string }) => plan.name === 'Basic');
        const goldPlan = plansData.find((plan: { name: string }) => plan.name === 'Gold');

        if (basicPlan && goldPlan) {
          this.plans[0].planId = basicPlan.id;
          this.plans[1].planId = goldPlan.id;
        } else {
          console.error('Planos não encontrados');
        }
      }
    } catch (error) {
      console.error('Erro ao carregar os planos:', error);
    }
  }

  // Função para associar um plano ao usuário
  async subscribeToPlan(planName: string, name: string) {
    try {
      let planId: string | undefined;

      if (name === 'Basic') {
        const planData = await this.authService.getPlanBasic(planName);

        if (!planData) {
          console.error('Erro ao buscar o ID do plano');
          return;
        }

        planId = planData.id;
      } else if (name === 'Gold') {
        const planData = await this.authService.getPlanGold(planName);

        if (!planData) {
          console.error('Erro ao buscar o ID do plano');
          return;
        }

        planId = planData.id;
      }

      if (!planId) {
        console.error('Erro: ID do plano não encontrado');
        return;
      }

      // Obtenha o ID do usuário logado
      const user = await this.authService.getLoggedInUser();

      if (!user || !user.id) {
        console.error('Erro: Usuário não encontrado');
        return;
      }

      // Agora faça o update do plano do usuário
      const updateSuccess = await this.authService.updateUserPlan(user.id, planId);
      if (!updateSuccess) {
        console.error('Erro ao atualizar o plano do usuário.');
      } else {
        console.log('Plano do usuário atualizado com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao inscrever no plano:', error);
    }
  }



}
