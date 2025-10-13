import { Pipe, PipeTransform } from '@angular/core'
import { String } from 'lodash'

@Pipe({
	name: 'initialsLetters',
	pure: false,
})
export class InitialsLettersPipe implements PipeTransform {
	transform(value: string, num: number): string {
		if (value.trim() === '') return 'AB'
		let word = value.split(' ')
		// * si num es 2 toma la posicion 0 y 1 del array. Se quitan las cadenas vacías si hubieran
		word = word.slice(0, num).filter((w: string) => w !== '')
		// * Las primera letra de cada palabra se pasa a mayuscula
		word = word.map((letter) => letter[0].toUpperCase())
		return word.toString().replace(',', '')
	}
}
