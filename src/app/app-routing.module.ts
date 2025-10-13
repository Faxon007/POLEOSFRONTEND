import { NgModule } from '@angular/core'
import { PreloadAllModules, RouterModule, Routes } from '@angular/router'
import { authGuard } from './guards/auth/auth.guard'
import { ForgotPasswordGuard } from './guards/forgot-password/forgot-password.guard'
import { PermissionsGuard } from './guards/permissions/permissions.guard'
import { RefreshUserGuard } from './guards/permissions/refresh-user.guard'

const routes: Routes = [
	{
		path: 'reset-password',
		loadChildren: () =>
			import('./pages/reset-password/reset-password.module').then(
				(m) => m.ResetPasswordPageModule
			),
		canActivateChild: [authGuard, ForgotPasswordGuard],
	},
	{
		path: 'forgot-password',
		loadChildren: () =>
			import('./pages/forgot-password/forgot-password.module').then(
				(m) => m.ForgotPasswordPageModule
			),
		canActivateChild: [authGuard],
	},
	{
		path: 'login',
		loadChildren: () =>
			import('./pages/login/login.module').then((m) => m.LoginPageModule),
		canActivateChild: [authGuard],
	},
	{
		path: '',
		loadChildren: () =>
			import('./pages/index/index.module').then((m) => m.IndexPageModule),
		//canActivate: [RefreshUserGuard],
		canActivateChild: [authGuard, PermissionsGuard],
	},
	
	{
		path: '**',
		redirectTo: '/',
	}/*,
  {
    path: 'robots',
    loadChildren: () => import('./pages/robots/robots.module').then( m => m.RobotsPageModule)
  }*/
]

@NgModule({
	imports: [
		RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
	],
	exports: [RouterModule],
})
export class AppRoutingModule {}
