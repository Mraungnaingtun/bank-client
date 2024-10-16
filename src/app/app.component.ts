import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatToolbarModule, 
    MatButtonModule, 
    MatIconModule,
    CommonModule,
    MatMenuModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'client';

  menuItems = [
    { label: 'User', link: '/user' },
    { label: 'Chat', link: '/chat' },
  ];

}
