import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
	name: 'filter',
	pure: true,
})
export class FilterPipe implements PipeTransform {
	transform(items: any[], search: string, params?: any): any {
		if (!items.length) return []
		if (!search || search === '' || search?.length < 1) return items
		return items.filter((item) =>
			String(item[params])?.toLowerCase()?.includes(search.toLowerCase())
		)
	}
}
