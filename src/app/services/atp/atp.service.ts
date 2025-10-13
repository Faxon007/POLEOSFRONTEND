import { Injectable } from '@angular/core'
import { IPagination, IAtp } from 'src/app/interfaces'
import { BehaviorSubject, Observable, of } from 'rxjs'
import * as QueryString from 'qs'
import { GeneralHttp } from '../common/generalHttp'
import { BitacoraService } from 'src/app/utils/BitacoraService'
import { AuthStore } from 'src/app/utils/auth';
@Injectable({
    providedIn: 'root',
})
export class AtpService {
    private atpSubject: BehaviorSubject<IPagination>
    public atp: Observable<IPagination>

    public currentPage = 1
    private limit = 10
    private query = {
        page: this.currentPage,
        limit: this.limit,
        title: '',
    }

    constructor(private generalHttp: GeneralHttp,private bitacoraService: BitacoraService,private auth: AuthStore) {
            const initialState = {
                rows: [],
                pages: 0,
                count: 0,
            }
            this.atpSubject = new BehaviorSubject<IPagination>(initialState)
            this.atp = this.atpSubject.asObservable()
        }

    setAtp(atp: IPagination) {
        this.atpSubject.next(atp)
    }

    get atpValue(): IPagination {
        return this.atpSubject.value
    }

    getAllAtpWithExecutions(): Observable<IPagination> {
        let limit = -1
        let include = 'atps'
        const QUERY_STRING = QueryString.stringify({ limit, include })
        return this.generalHttp.getAll('atps', QUERY_STRING)
    }

    getAllAtp(
        page: number = this.currentPage,
        limit: number = this.limit,
        title: string = ''
    ): Observable<IPagination> {
        this.query = { page, limit, title }
        const queryString = QueryString.stringify(this.query)

        return this.bitacoraService.ejecutarConBitacora('atp','find',this.generalHttp.getAll(
			'atps', queryString),
			'',
        	queryString,
        	`Se consultó el atp`
      );
    }

    createAtp(Atp: IAtp): Observable<IAtp> {
        return this.bitacoraService.ejecutarConBitacora('atp','create',this.generalHttp.create(
			'atps',
			Atp,
			'atps',
			false),
			'',
        	Atp,
        	`Se creó el atp "${Atp.title}"`
      );
    }

    updateAtp(updatedAtp: IAtp): Observable<IAtp> {
        const { id } = updatedAtp

        // Buscar la categoría anterior en el BehaviorSubject
        const oldAtp = this.atpValue.rows.find(c => c.id === id);

        return this.bitacoraService.ejecutarConBitacora('atp','update',this.generalHttp.update(
			'atps',
            updatedAtp,
            id || 1,
            'Atps',
            true,
            'Atps actualizado'),
			oldAtp,
        	updatedAtp,
        	`Se actualizo el atp "${updatedAtp.title}"`
      );
    }

    deleteAtp = (id: number) => {
        const oldAtp = this.atpValue.rows.find(c => c.id === id);
        return this.bitacoraService.ejecutarConBitacora('atp','delete',this.generalHttp.delete(
			'atps',
            id,
            'Atps',
            true,
            false),
			oldAtp,
        	'',
        	`Se eliminó el atp`
      );
    }
    updateTable(isDelete: boolean = false) {
        if (isDelete)
            this.currentPage =
                this.atpValue.rows.length <= 1 && this.currentPage > 1
                    ? this.currentPage - 1
                    : this.currentPage
        this.getAllAtp(
            this.currentPage,
            this.query.limit,
            this.query.title
        ).subscribe((res: IPagination) => this.atpSubject.next(res))
    }
}
