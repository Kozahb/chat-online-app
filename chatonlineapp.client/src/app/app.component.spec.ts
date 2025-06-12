import { ChatService } from './services/chat';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';



describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockChatService: jasmine.SpyObj<ChatService>;

  beforeEach(async () => {
    
    mockChatService = jasmine.createSpyObj('ChatService', ['startConnection', 'addReceiveListener', 'sendMessage']);

    await TestBed.configureTestingModule({

      providers: [
        { provide: ChatService, useValue: mockChatService }
      ]
    }).compileComponents();

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
                                                     

    fixture.autoDetectChanges();
  });

 
  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should call startConnection on ChatService when initialized', () => {
 
    expect(mockChatService.startConnection).toHaveBeenCalled();
          
  });
});
