import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LoadingService } from '../../services/loading.service';
import { UserService } from '../../services/user.service';
import { OverlayContainer } from '@angular/cdk/overlay';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  isCollapsed = false;

  menus: { [key: string]: boolean } = {
    cadastros: false,
    agenda: false
  };

  userName: string | null = null;

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private loadingService: LoadingService,
    private userService: UserService,
    private overlayContainer: OverlayContainer // Aqui está o OverlayContainer
  ) {}

  ngOnInit(): void {
    this.userName = this.userService.getUserNameFromToken();
  }


  toggleMenu(menu: string): void {
    this.menus[menu] = !this.menus[menu];
  }

  logout(): void {
    this.loadingService.show(); // Mostra o loading
    this.cookieService.delete('USER_INFO');
    setTimeout(() => {
      this.router.navigate(['/login']).then(() => {
        this.loadingService.hide(); // Esconde o loading após a navegação
      });
    }, 1000); // Simula um atraso para demonstrar o loading
  }

}
