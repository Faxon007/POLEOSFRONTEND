import { FilterPipe } from './filter/filter.pipe'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { InitialsLettersPipe } from './initialsLetters/initials-letters.pipe'
import { SafePipe } from './safe/safe.pipe'

@NgModule({
	declarations: [FilterPipe, InitialsLettersPipe, SafePipe],
	imports: [CommonModule],
	exports: [FilterPipe, InitialsLettersPipe, SafePipe],
})
export class PipesModule {}
