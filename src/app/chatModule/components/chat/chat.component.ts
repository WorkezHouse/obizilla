import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../../shared/navbar/navbar.component';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [ CommonModule, NavbarComponent], // Adiciona o CommonModule para usar ngClass
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  messages: { sender: string, text: string }[] = [];
  userQuestions: string[] = [];
  aiResponses: string[] = [];
  canSendMessage = true;
  showWelcomeMessage = true;

  constructor(private changeDetectorRef: ChangeDetectorRef) {
  }

  get hasBotMessages(): boolean {
    return this.messages.some(message => message.sender === 'bot');
  }

  onEnter(event: KeyboardEvent) {
    if (event.key === 'Enter' && this.canSendMessage && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  sendMessage() {
    console.log('sendMessage called');

    // Acessando o input de texto corretamente
    const inputElement = document.getElementById('userInput') as HTMLTextAreaElement;
    const messageText = inputElement.value.trim();

    if (!messageText) return;

    console.log('User message:', messageText);


    // Desabilita o envio de novas mensagens
    this.canSendMessage = false;
    const sendButton = document.getElementById('sendButton') as HTMLElement;
    sendButton.style.opacity = '0.5'; // Opacidade reduzida

    // Limpa o input e a mensagem de boas-vindas
    inputElement.value = '';
    this.showWelcomeMessage = false;

    // Exibe a mensagem do usuário no chat
    this.messages.push({ text: messageText, sender: 'user' });

    // Adiciona a pergunta do usuário no array de perguntas
    this.userQuestions.push(messageText);

    // Exibe o loader (sem adicionar como uma mensagem de texto)
    this.canSendMessage = false;

    console.log('Sending data to webhook:', {
      userQuestions: this.userQuestions,
      aiResponses: this.aiResponses
    });

    // Envia a mensagem e os arrays de perguntas e respostas para o webhook do n8n
    fetch('https://webhook.workez.online/webhook/fe8ee5ca-1a13-449f-bc2c-54fca1795da6', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userQuestions: this.userQuestions, // Envia as perguntas do usuário
        aiResponses: this.aiResponses      // Envia as respostas da IA
      })
    })
    .then(response => {
      console.log('Webhook response:', response);
      return response.json();
    })
    .then(data => {
      console.log('Webhook data:', data);

      // Remove o loading
      this.messages.pop();

      let botText;
      if (data.choices && data.choices[0] && data.choices[0].text) {
        botText = data.choices[0].text;
      } else if (data.message && data.message.content) {
        botText = data.message.content;
      } else {
        botText = "Texto não disponível"; // Caso nenhum formato esteja presente
      }

      console.log('Bot response:', botText);

      // Adiciona a resposta da IA no array de respostas
      this.aiResponses.push(botText);

      // Exibe a resposta do bot no chat
      this.messages.push({ text: botText, sender: 'bot' });

      // Força a atualização da view para garantir que a mensagem apareça
      this.changeDetectorRef.detectChanges();  // Corrigido aqui!

      // Reativa o envio de mensagens após a resposta
      this.canSendMessage = true;
      sendButton.style.opacity = '1'; // Opacidade normal

      this.scrollToBottom();
    })
    .catch(error => {
      console.error('Erro:', error);
      this.messages.pop();

      // Exibe uma mensagem de erro
      this.messages.push({ text: 'Ocorreu um erro. Tente novamente.', sender: 'bot' });

      // Reativa o envio de mensagens em caso de erro
      this.canSendMessage = true;
      sendButton.style.opacity = '1'; // Opacidade normal

      this.scrollToBottom();
    });
  }

  scrollToBottom() {
    const chatMessagesElement = document.getElementById('chat-messages');
    if (chatMessagesElement) {
      chatMessagesElement.scrollTop = chatMessagesElement.scrollHeight;
    }
  }
}
