import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@sabspl-frontend/admin/services/auth.service';
import { ContextMenuMeta } from '@sabspl-frontend/shared';
import { BreadcrumbService } from '@sabspl-frontend/shared';
import { UserInfo } from '@sabspl-frontend/shared-module/types/User';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent {
  toggleAdminMenu: boolean = false;
  profileMenuMeta: ContextMenuMeta;
  darkMode: boolean = false;
  sidebarToggle: boolean = false;
  userInfo!: UserInfo;

  constructor(
    private router: Router,
    public breadcrumbService: BreadcrumbService,
    private authService: AuthService
  ) {
    this.profileMenuMeta = {
      menuName: 'profile-menu',
      menuClassList: ["absolute","right-0","z-10","mt-2","w-48","rounded-md","bg-white","py-1","shadow-lg","ring-1","ring-black","ring-opacity-5","focus:outline-none"],
      menuItems : [
        {
          label: 'Your Profile',
          click: this.menuClickEventHandler.bind(this)
        },
        {
          label: 'Settings',
          click: this.menuClickEventHandler.bind(this)
        },
        {
          label: 'Sign out',
          click: this.menuClickEventHandler.bind(this)
        }
      ]
    }
  }

  ngOnInit() {
    this.darkMode = localStorage.getItem('dark-mode') == 'true' || false;
    this.checkDarkMode();

    this.breadcrumbService.addItem({
      name: "Dashboard",
      url: "/admin/dashboard"
    });
    this.userInfo = JSON.parse(localStorage.getItem('user_details') || "");
  }

  menuClickEventHandler(clickedLink: string) {
    console.log("menuClickEventHandler", clickedLink)
  }

  darkModeToggle(event: any) {
    this.darkMode = event.target.checked;
    localStorage.setItem('dark-mode', event.target.checked);
    this.checkDarkMode();
  }

  checkDarkMode() {
    if(this.darkMode) {
      document.documentElement.classList.add('dark')
    }
    else {
      document.documentElement.classList.remove('dark')
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }

  ngOnDestroy() {
    this.breadcrumbService.clearBreadcrumbs();
  }
}
