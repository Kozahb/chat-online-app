import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';

export type ConnectionStatus = 'connected' | 'reconnecting' | 'disconnected'


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private hubConnection!: signalR.HubConnection;
  private readonly hubUrl = 'https://localhost:5158/chatHub'; // ajuste a URL conforme necessário

  public connectionStatus$ = new BehaviorSubject<ConnectionStatus>('disconnected')
  constructor() {
    this.startConnection();
  }

  public startConnection(): void {
    if (this.hubConnection) return;

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(this.hubUrl)
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('✅ SignalR connected successfully.'))
      .catch(err => console.error('❌ SignalR connection error:', err));

    this.registerReconnectEvents();
  }

  private registerReconnectEvents(): void {
    this.hubConnection.onreconnecting(error => {
      console.warn('🔄 Reconnecting...', error);
    });

    this.hubConnection.onreconnected(connectionId => {
      console.log('✅ Reconnected with connectionId:', connectionId);
      this.connectionStatus$.next('connected');
    });

    this.hubConnection.onclose(error => {
      console.error('❌ Connection closed unexpectedly:', error);
      this.connectionStatus$.next('disconnected')
    });
  }

  public addReceiveMessageListener(callback: (user: string, message: string) => void): void {
    this.hubConnection.on('ReceiveMessage', callback);
  }

  public sendMessage(user: string, message: string): void {
    if (!this.hubConnection || this.hubConnection.state !== signalR.HubConnectionState.Connected) {
      console.error('❌ Cannot send message. Not connected to SignalR.');
      return;
    }

    this.hubConnection.invoke('SendMessage', user, message)
      .catch(err => console.error('❌ Error sending message:', err));
  }
}
