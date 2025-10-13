import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {
    // Leer query params
    const urlParams = new URLSearchParams(window.location.search);
    const sessionParam = urlParams.get('session');
    const pathParam = urlParams.get('path');

    if (sessionParam) {
      try {
        // Decodificar y guardar la sesión completa en localStorage
        const session = JSON.parse(decodeURIComponent(sessionParam));
        localStorage.setItem('session', JSON.stringify(session));

        // Redirigir a la ruta enviada
        if (pathParam) {
          this.router.navigateByUrl(pathParam);
        }
      } catch (error) {
        console.error('Error al procesar la sesión enviada:', error);
        // En caso de error, ir al login
        this.router.navigate(['/login']);
      }
    } else {
      // Si no hay sesión enviada, verificar si ya existe en localStorage
      const existingSessionStr = localStorage.getItem('session');
      if (existingSessionStr) {
        const existingSession = JSON.parse(existingSessionStr);
        if (existingSession?.token) {
          // Redirigir a la ruta guardada o a dashboard por defecto
          const defaultPath = pathParam || '/dashboard';
          this.router.navigateByUrl(defaultPath);
        } else {
          this.router.navigate(['/login']);
        }
      } else {
        this.router.navigate(['/login']);
      }
    }
  }
}
