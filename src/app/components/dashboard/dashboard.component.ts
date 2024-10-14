import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  isDarkTheme = false;

  @HostBinding('class') className = '';

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    this.className = this.isDarkTheme ? 'dark-theme' : 'light-theme';
  }

}
