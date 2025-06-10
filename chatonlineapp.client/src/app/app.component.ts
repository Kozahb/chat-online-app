import { ChatService } from './services/chat'; 
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RouterModule } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css',
  imports: [
    CommonModule,
    RouterModule
  ]

})
export class AppComponent implements OnInit {
  title = 'chatonlineapp.client';

  constructor(private chatService: ChatService) {


  }

  ngOnInit() {
    this.chatService.startConnection();
  }
 
}
