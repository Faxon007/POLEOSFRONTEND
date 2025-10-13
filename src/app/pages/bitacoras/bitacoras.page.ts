import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BitacoraService } from 'src/app/services/bitacoras/bitacoras.service';
import { BitacoraModalComponent } from './modal/bitacora-modal/bitacora-modal.component';
import { LIMIT } from 'src/app/services/common/httpOptions';
import { ColDef } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { ViewChild } from '@angular/core';



@Component({
  selector: 'app-bitacoras',
  templateUrl: './bitacoras.page.html',
  styleUrls: ['./bitacoras.page.scss'],
  
})
export class BitacorasPage implements OnInit {
  @ViewChild('grid') grid!: AgGridAngular;
  rowData: any[] = [];
  loading: boolean = false;
  search: string = '';
  startDate: string | undefined;
  endDate: string | undefined;
  limit: number = LIMIT;
  optionFilter: string = '';
actionFilter: string = '';
statusFilter: string = '';
userFilter: string = '';

  columnDefs: ColDef[] = [
    { headerName: 'Opción', field: 'option', filter: true, sortable: true },
    { headerName: 'Acción', field: 'action', filter: true, sortable: true },
    { headerName: 'Usuario', field: 'user', filter: true, sortable: true },
    { headerName: 'Estado', field: 'status', filter: true, sortable: true },
    { headerName: 'Mensaje', field: 'message', filter: true, sortable: true },
    { headerName: 'Fecha', field: 'dateexec' },
        {
      headerName: '',
      field: 'actions',
      cellRenderer: (params: any) => {
        const button = document.createElement('button');
        button.innerText = 'Ver detalle';
        button.classList.add('primary', 'small');
        button.addEventListener('click', () =>
          this.openBitacoraModal(params.data, 'view')
        );
        return button;
      },
      flex: 1,
      cellStyle: { textAlign: 'center' }
    },
  ];


  defaultColDef: ColDef = {
    resizable: true,
    floatingFilter: true, // filtros debajo de los headers
    flex: 1,
  };

  constructor(
    public modalCtrl: ModalController,
    public bitacoraService: BitacoraService
  ) {}

  ngOnInit() {
    this.getBitacoras();
  }
  firstLoad: boolean = true;

getBitacoras(page: number = 1, filter: boolean = false) {
  this.loading = true;

  const limit = filter ? 0 : this.firstLoad ? 0 : this.limit;

  const option = this.optionFilter?.trim() || undefined;
  const action = this.actionFilter?.trim() || undefined;
  const status = this.statusFilter?.trim() || undefined;
  const user = this.userFilter?.trim() || undefined;

  this.bitacoraService
    .getAllBitacoras(
      this.search,
      page,
      limit,
      this.startDate,
      this.endDate,
      action,
      option,
      status,
      user
    )
    .subscribe((res) => {
      this.rowData = res.rows;
      this.bitacoraService.setBitacoras(res);
      this.loading = false;
      this.firstLoad = false;
    });
}


filterByDate() {
  this.bitacoraService.currentPage = 1;
  this.getBitacoras(1, true); // true = traer todos para filtrar
}

resetFilters() {
  if (!this.grid?.api) return;
  const filterModel = this.grid.api.getFilterModel();
  Object.keys(filterModel).forEach((key) => {
    if (key !== 'dateexec') delete filterModel[key];
  });
  this.grid.api.setFilterModel(filterModel);
  this.grid.api.onFilterChanged();
}
  async openBitacoraModal(bitacora: any = undefined, type: string = 'view') {
    const modal = await this.modalCtrl.create({
      component: BitacoraModalComponent,
      cssClass: 'claro-oym-modal',
      swipeToClose: true,
      mode: 'ios',
      componentProps: {
        type,
        bitacora: bitacora || { action: '', option: '' },
      },
    });
    await modal.present();
  }
 exportToCsv() {
    if (!this.grid?.api) return;

    this.grid.api.exportDataAsCsv({
      fileName: 'bitacoras.csv',
      allColumns: true,
    });
  }

}
