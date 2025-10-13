import { Injectable } from '@angular/core'
import { IPagination, IPoleo } from 'src/app/interfaces'
import { BehaviorSubject, Observable, of } from 'rxjs'
import * as QueryString from 'qs'
import { GeneralHttp } from '../common/generalHttp'
@Injectable({
    providedIn: 'root',
})
export class PoleosService {
    private poleosSubject: BehaviorSubject<IPagination>
    public poleos: Observable<IPagination>

    public currentPage = 1
    private limit = 10
    private query = {
        page: this.currentPage,
        limit: this.limit,
        title: '',
        robotId: []
    }

    constructor(private generalHttp: GeneralHttp) {
        const initialState = {
            rows: [],
            pages: 0,
            count: 0,
        }
        this.poleosSubject = new BehaviorSubject<IPagination>(initialState)
        this.poleos = this.poleosSubject.asObservable()
    }

    setPoleos(poleos: IPagination) {
        this.poleosSubject.next(poleos)
    }

    get poleosValue(): IPagination {
        return this.poleosSubject.value
    }

    getAllPoleosWithExecutions(): Observable<IPagination> {
        let limit = -1
        let include = 'execution'
        const QUERY_STRING = QueryString.stringify({ limit, include })
        return this.generalHttp.getAll('poleos', QUERY_STRING)
    }

    getAllPoleos(
        page: number = this.currentPage,
        limit: number = this.limit,
        title: string = '',
        robotId?: number[]
    ): Observable<IPagination> {
        this.query = { page, limit, title,robotId }
        const queryString = QueryString.stringify(this.query)
        
        return this.generalHttp.getAll('poleos', queryString)
    }

    createPoleo(Poleo: IPoleo): Observable<IPoleo> {
        return this.generalHttp.create(
            'poleos',
            Poleo,
            'poleos',
            false
        )
    }

    updatePoleo(updatedPoleo: IPoleo): Observable<IPoleo> {
        const { id } = updatedPoleo
        return this.generalHttp.update(
            'poleos',
            updatedPoleo,
            id || 1,
            'Poleo',
            true,
            'Poleo actualizado'
        )
    }

    deletePoleo = (id: number) => {
        return this.generalHttp.delete(
            'poleos',
            id,
            'Poleo',
            true,
            false
        )
    }
    updateTable(isDelete: boolean = false) {
        if (isDelete)
            this.currentPage =
                this.poleosValue.rows.length <= 1 && this.currentPage > 1
                    ? this.currentPage - 1
                    : this.currentPage,
                    
        this.getAllPoleos(
            this.currentPage,
            this.query.limit,
            this.query.title,
        ).subscribe((res: IPagination) => this.poleosSubject.next(res))
    }
}
