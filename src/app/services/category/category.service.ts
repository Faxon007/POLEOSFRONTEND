import { Injectable } from '@angular/core'
import { IPagination, ICategory } from 'src/app/interfaces'
import { BehaviorSubject, Observable, of } from 'rxjs'
import * as QueryString from 'qs'
import { GeneralHttp } from '../common/generalHttp'
import { BitacoraService } from 'src/app/utils/BitacoraService'
import { tap, catchError } from 'rxjs/operators';
import { AuthStore } from 'src/app/utils/auth';
@Injectable({
	providedIn: 'root',
})
export class CategoryService {
	private categoriesSubject: BehaviorSubject<IPagination>
	public categories: Observable<IPagination>

	public currentPage = 1
	private limit = 10
	private query = {
		page: this.currentPage,
		limit: this.limit,
		name: '',
	}

	constructor(private generalHttp: GeneralHttp,private bitacoraService: BitacoraService,private auth: AuthStore) {
		const initialState = {
			rows: [],
			pages: 0,
			count: 0,
		}
		this.categoriesSubject = new BehaviorSubject<IPagination>(initialState)
		this.categories = this.categoriesSubject.asObservable()
	}

	setCategoies(categories: IPagination) {
		this.categoriesSubject.next(categories)
	}

	get categoriesValue(): IPagination {
		return this.categoriesSubject.value
	}

	getAllCategoriesWithReports(): Observable<IPagination> {
		let limit = -1
		let include = 'report'
		const QUERY_STRING = QueryString.stringify({ limit, include })
		return this.generalHttp.getAll('categories', QUERY_STRING)
	}

	getAllCategories(
		page: number = this.currentPage,
		limit: number = this.limit,
		name: string = ''
	): Observable<IPagination> {
		this.query = { page, limit, name }
		const queryString = QueryString.stringify(this.query)
		return this.generalHttp.getAll('categories', queryString)
	}

	createCategory(category: ICategory) {
		return this.bitacoraService.ejecutarConBitacora('categoria','create',this.generalHttp.create(
			'categories',
			category,
			'Categoria',
			false),
			'',
        	category,
        	`Se creó la categoría "${category.name}"`
      );
}
	

	updateCategory(updatedCategory: ICategory): Observable<ICategory> {
		const { id } = updatedCategory;

		// Buscar la categoría anterior en el BehaviorSubject
		const oldCategory = this.categoriesValue.rows.find(c => c.id === id);

		return this.bitacoraService.ejecutarConBitacora(
		'categoria',
		'update',
		this.generalHttp.update(
			'categories',
			updatedCategory,
			id || 1,
			'Categoria',
			true,
			'Categoría actualizada'
		),
		oldCategory,              
		updatedCategory,          
		`Se actualizó la categoría "${updatedCategory.name}"`
		);
	}

	deleteCategory = (id: number) => {
		const oldCategory = this.categoriesValue.rows.find(c => c.id === id);
		return this.bitacoraService.ejecutarConBitacora(
			'categoria',
			'delete',
			this.generalHttp.delete(
			'categories',
			id,
			'Categoria',
			true,
			false
			),
			oldCategory,              
			'',          
			`Se elimino la categoría`
		);
	}



	updateTable(isDelete: boolean = false) {
		if (isDelete)
			this.currentPage =
				this.categoriesValue.rows.length <= 1 && this.currentPage > 1
					? this.currentPage - 1
					: this.currentPage
		this.getAllCategories(
			this.currentPage,
			this.query.limit,
			this.query.name
		).subscribe((res: IPagination) => this.categoriesSubject.next(res))
	}
}
