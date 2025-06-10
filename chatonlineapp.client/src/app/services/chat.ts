import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})

export class ChatService {
  private hubConnection!: signalR.HubConnection;

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:5158/chatHub') // ajustar URL depois
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('Conexão iniciada com o SignalR!'))
      .catch((err) => {
        console.log('Erro ao conectar com o SignalR: ', err);
      });

  }
  public addReceiveMessageListener(callback: (user: string, message: string) => void): void {
    this.hubConnection.on('ReceiveMessage', callback);
  }

  public sendMessage(user: string, message: string) {
    this.hubConnection.invoke('SendMessage', user, message)
      .catch((err) => {
        console.error('Erro ao enviar mensagem: ', err);

      });
  }
}
