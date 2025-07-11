import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService, ConnectionStatus } from '../services/chat';

interface Message {
  user: string;
  text: string;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  standalone: true,
  styleUrl: './chat.component.css',
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class ChatComponent implements OnInit, OnDestroy {
  userName: string = '';
  message: string = '';
  messages: Message[] = [];

  connectionStatus: ConnectionStatus = 'disconnected';
  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.chatService.connectionStatus$.subscribe(status => {
      this.connectionStatus = status;
    });

    this.chatService.addReceiveMessageListener((receivedUser: string, receivedMessage: string) => {
      this.messages.push({ user: receivedUser, text: receivedMessage });
    });
  }

ngOnDestroy(): void {
  //Complementar futuro unsubscribe
}

sendMessage(): void {
  if(this.userName && this.message) {
  this.chatService.sendMessage(this.userName, this.message);
  this.message = '';
}
  }
}
