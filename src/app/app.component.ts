import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Subscription } from 'rxjs';
import { AlertMessageComponent } from './shared/components/alert-message/alert-message.component';
import { NavbarComponent } from './shared/navbar/navbar.component';

let browserReresh = false;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NavbarComponent, RouterOutlet, AlertMessageComponent, ToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'  
})
export class AppComponent {

  menus: any[] = [];
  subscription: Subscription = new Subscription;

  constructor(    
    private router: Router,
    private translate: TranslateService,
    private primengConfig: PrimeNGConfig
  ) {    
    this.translate.setDefaultLang('pt-br');
    this.primengConfig.ripple = true;
    // this.subscription = router.events.subscribe((event) => {
    //   if (event instanceof NavigationStart)
    //     browserReresh = !router.navigated
    // });

    this.getMenus();
  }

  private getMenus() {
    this.menus = [
      {
        label: 'Home',
        items: [
          {
            label: 'Dashboard',
            icon: 'pi pi-fw pi-home',
            routerLink: ['/']
          }
        ]
      },
    ];
  }
}