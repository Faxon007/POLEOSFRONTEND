import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IPage } from 'src/app/interfaces';
import { AuthStore } from 'src/app/utils/auth';
import { SideMenuStore } from 'src/app/utils/sidemenu';
import { isExceptionUser } from 'src/app/utils/user-exceptions';

@Component({
  selector: 'app-item-collapse',
  templateUrl: './item-collapse.component.html',
  styleUrls: ['./item-collapse.component.scss'],
})
export class ItemCollapseComponent implements OnInit {
  currentPage: IPage = <IPage>{};

  management: boolean = false;
  administrativeReports: boolean = false;
  rpa: boolean = false;

  reportAdminNav: IPage[] = [
    { title: 'Control de bitacoras', url: '/administrative-reports/development-control', icon: '', ref: '/reports-admin', path: 'development-control' },
    { title: 'Control de desarrollo', url: '/administrative-reports/development-control', icon: '', ref: '/reports-admin', path: 'development-control' },
    { title: 'Control de visitas', url: '/administrative-reports/visit-controls', icon: '', ref: '/reports-admin', path: 'visit-controls' },
    { title: 'Estadísticas de tablas', url: '/administrative-reports/table-statistics', icon: '', ref: '/reports-admin', path: 'table-statistics' },
    { title: 'Validación de Jobs', url: '/administrative-reports/jobs-validation', icon: '', ref: '/reports-admin', path: 'jobs-validation' },
    { title: 'Interanual SM - Remedy - RD', url: '/administrative-reports/interanual', icon: '', ref: '/reports-admin', path: 'interanual' },
    { title: 'Interanual SM - Remedy | Fernando', url: '/administrative-reports/rm-sm-data', icon: '', ref: '/reports-admin', path: 'rm-sm-data' },
    { title: 'Validación Errores en Reportes', url: '/administrative-reports/errors-report', icon: '', ref: '/reports-admin', path: 'errors-report' },
  ];

  managementNav: IPage[] = [
    { title: 'Usuarios', url: '/management/users', icon: '', ref: '/management', path: 'users' },
    { title: 'Roles', url: '/management/roles', icon: '', ref: '/management', path: 'roles' },
    { title: 'Categorías', url: '/management/categories', ref: '/management', icon: '', path: 'categories' },
    { title: 'Reportes', url: '/management/reports', ref: '/management', icon: '', path: 'reports' },
    { title: 'Bitacoras', url: '/management/bitacoras', ref: '/management', icon: '', path: 'bitacoras' },
  ];

  rpaNav: IPage[] = [
    { title: 'Administrar Robots', url: '/rpa/robots', icon: '', ref: '/rpa', path: 'robots' }
  ];

  rpaSubOptions: string[] = []; // <-- Submenús dinámicos

  constructor(
    public router: Router,
    public sideMenuStore: SideMenuStore,
    public authStore: AuthStore
  ) {}

  ngOnInit() {
    this.authStore.auth.subscribe((data) => {
      const user = data.user;

      /*this.administrativeReports = user?.role?.permissions.administrativeReports ?? false;
      this.management = user?.role?.permissions.management ?? false;*/
      this.rpa = user?.role?.permissions.rpa ?? false;

      // Excepción específica para el usuario
      if (isExceptionUser(user)) {
        this.administrativeReports = true;
        this.management = true;
        this.rpa = true;

        /*this.reportAdminNav = this.reportAdminNav.filter((p) => p.path === 'development-control');
        this.managementNav = this.managementNav.filter((p) => p.path === 'users');*/
      }

      // Generar subopciones dinámicas según permisos de robots
      const robotPermissions = user?.role?.permissions.robotPermissions ?? {};
      const subOptions: string[] = [];
      Object.keys(robotPermissions).forEach((key) => {
        robotPermissions[key].forEach((opt) => {
          if (!subOptions.includes(opt)) subOptions.push(opt);
        });
      });
      this.rpaSubOptions = subOptions;
    });
  }

  isSelected(item: any) {
    if (!this.sideMenuStore.sidemenuValue?.show && Array.isArray(item)) {
      return Array.isArray(item) && item?.some((p: IPage) => this.router?.url === p?.url);
    }
    return this.router?.url === item;
  }

  selectPage(page?: any) {
    this.currentPage = page;
    this.router.navigate([page.url]);
  }
}
