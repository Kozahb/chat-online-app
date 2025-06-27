import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter, Routes } from '@angular/router';
import { ChatComponent } from './app/chat/chat.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/chat', pathMatch: 'full' },
  { path: 'chat', component: ChatComponent },
];


bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes) // Fornece as rotas para a aplicação
    // Outros providers globais, como ChatService (se não tiver providedIn: 'root')
    // Embora ChatService com providedIn: 'root' já seja injetável em qualquer lugar
  ]
}).catch(err => console.error(err));
