import { Injectable } from '@angular/core';
import { AuthStore } from 'src/app/utils/auth';
import { GeneralHttp } from '../services/common/generalHttp';
import { catchError, map, Observable, of, switchMap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BitacoraService {
  constructor(
    private generalHttp: GeneralHttp,
    private auth: AuthStore
  ) {}

  registrarBitacora(
    option: string ='',
    action: 'create' | 'update' | 'delete' | 'find',
    oldObject: any = null,
    newObject: any = null,
    message: string = ''
  ) {
    const payload = {
      option:option,
      action: action,
      oldObject: oldObject ? JSON.stringify(oldObject) : '',
      newObject: newObject ? JSON.stringify(newObject) : '',
      status: 'OK',
      message: message,
      dateexec: new Date().toISOString(),
      user: this.auth.user?.name || 'Usuario no identificado'
    };

    return this.generalHttp.createLog('logs', payload, '', false);
  }

  ejecutarConBitacora<T>(
    option: string ='',
    accion: 'create' | 'update' | 'delete' | 'find',
    observableOperacion: Observable<T>,
    oldObject: any = '',
    newObject: any = '',
    mensajeExito: string = ''
  ): Observable<T> {
    return observableOperacion.pipe(
      switchMap(result =>
        this.registrarBitacora(option, accion, oldObject, newObject, mensajeExito).pipe(
          map(() => result),
          catchError(errLog => {
            console.error('Error al registrar log de éxito:', errLog);
            return of(result);
          })
        )
      ),
      catchError(err =>
        this.registrarBitacora(
          accion,
          oldObject,
          newObject,
          `Error: ${err.message || err}`
        ).pipe(
          switchMap(() => throwError(() => err)),
          catchError(errLog => {
            console.error('Error al registrar log de fallo:', errLog);
            return throwError(() => err);
          })
        )
      )
    );
  }
}
