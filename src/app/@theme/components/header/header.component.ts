import { Component, Input, OnInit } from '@angular/core';

import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { AnalyticsService } from '../../../@core/utils/analytics.service';
import { AutenticationService } from '../../../@core/utils/autentication.service';


@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  username: any;
  @Input() position = 'normal';

  constructor(private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private analyticsService: AnalyticsService,
    public autenticacion: AutenticationService,
  ) {
  }

  ngOnInit() {
    this.autenticacion.init();
  }

  liveToken() {
      if (this.autenticacion.live()) {
        this.username = (this.autenticacion.getPayload()).name;
      }
      return this.autenticacion.live();
  }

  login() {
    this.autenticacion.login();
  }

  logout() {
    this.autenticacion.logout();
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  toggleSettings(): boolean {
    this.sidebarService.toggle(false, 'settings-sidebar');
    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }
}
