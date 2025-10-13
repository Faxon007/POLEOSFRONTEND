import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { formatDate } from '@angular/common';
import { IBitacora } from 'src/app/interfaces';

@Component({
  selector: 'app-bitacora-modal',
  templateUrl: './bitacora-modal.component.html',
  styleUrls: ['./bitacora-modal.component.scss'],
})
export class BitacoraModalComponent implements OnInit {
  @Input() type?: string;
  @Input() bitacora: IBitacora = {
    option: '',
    action: '',
    status: '',
    message: '',
    dateexec: '',
    user: '',
    createdAt: '',
    updatedAt: '',
    deletedAt: '',
    oldObject: undefined as any,
    newObject: undefined as any,

  };

  // Objetos ya parseados
  oldObj: any | null = null;
  newObj: any | null = null;

  // Cambios detectados
  changes: { field: string; oldValue: any; newValue: any }[] = [];

  // Etiqueta traducida (Creación, Actualización, ...)
  actionLabel: string = '';

  private actionLabels: Record<string, string> = {
    create: 'Creación',
    update: 'Actualización',
    delete: 'Eliminación',
    find: 'Búsqueda',
  };

  constructor(private modalController: ModalController) {}

  ngOnInit(): void {
    const rawAction = this.bitacora.action || '';
    this.actionLabel = this.actionLabels[rawAction] ?? rawAction;

    // Si es una consulta (find/búsqueda), no parseamos ni mostramos objetos ni cambios
    if (rawAction === 'find') {
      this.oldObj = null;
      this.newObj = null;
      this.changes = [];
      return;
    }

    // Obtener las fuentes posibles (compatibilidad: oldObject | oldData)
    const rawOld =
      (this.bitacora as any).oldObject ??
      (this.bitacora as any).oldData ??
      null;
    const rawNew =
      (this.bitacora as any).newObject ??
      (this.bitacora as any).newData ??
      null;

    // Parseo seguro: si es string intentamos JSON.parse, si ya es object lo tomamos tal cual
    try {
      this.oldObj =
        typeof rawOld === 'string' && rawOld.trim().length > 0
          ? JSON.parse(rawOld)
          : rawOld ?? {};
    } catch (e) {
      console.warn('No se pudo parsear oldObject:', e);
      this.oldObj = {};
    }

    try {
      this.newObj =
        typeof rawNew === 'string' && rawNew.trim().length > 0
          ? JSON.parse(rawNew)
          : rawNew ?? {};
    } catch (e) {
      console.warn('No se pudo parsear newObject:', e);
      this.newObj = {};
    }

    // Comparar objetos (shallow). Para objetos anidados sencillos, se convierten a string para comparar.
    this.compareObjects(this.oldObj || {}, this.newObj || {});
  }

  // Formatea fechas a dd/MM/yyyy HH:mm:ss (usa locale 'es-ES')
  getFormattedDate(date?: string | Date | null): string {
    if (!date) return '';
    try {
      return formatDate(date, 'dd/MM/yyyy HH:mm:ss', 'es-ES');
    } catch {
      return String(date);
    }
  }

  // Devuelve las keys unificadas (ordenadas) para iterar en la tabla
  getKeys(): string[] {
    const oldKeys = this.oldObj ? Object.keys(this.oldObj) : [];
    const newKeys = this.newObj ? Object.keys(this.newObj) : [];
    const set = new Set<string>([...oldKeys, ...newKeys]);
    return Array.from(set);
  }

  // Comparación simple: si los valores son objetos se compara JSON.stringify para detectar cambios
  private compareObjects(oldO: any, newO: any) {
    this.changes = [];
    const keys = new Set([...Object.keys(oldO || {}), ...Object.keys(newO || {})]);

    keys.forEach((key) => {
      const oldVal = oldO?.[key];
      const newVal = newO?.[key];

      const oldNorm =
        oldVal !== null && typeof oldVal === 'object' ? JSON.stringify(oldVal) : oldVal;
      const newNorm =
        newVal !== null && typeof newVal === 'object' ? JSON.stringify(newVal) : newVal;

      // Consideramos cambio si son distintos (incluye undefined vs null vs valor)
      if (oldNorm !== newNorm) {
        this.changes.push({
          field: key,
          oldValue: oldVal ?? '—',
          newValue: newVal ?? '—',
        });
      }
    });
  }

  // Helper para mostrar valores de forma legible en plantilla
  formatValue(val: any): string {
    if (val === undefined || val === null) return '—';
    if (typeof val === 'object') {
      try {
        return JSON.stringify(val, null, 2);
      } catch {
        return String(val);
      }
    }
    return String(val);
  }

  cancel() {
    this.modalController.dismiss();
  }
}
