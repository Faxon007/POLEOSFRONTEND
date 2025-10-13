import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'

@Injectable({
	providedIn: 'root',
})
export class DarkModeService {
	private theme: BehaviorSubject<any>
	public darkMode: Observable<any>
	constructor() {
		let theme = { dark: false }
		try {
			theme = JSON.parse(localStorage.getItem('theme') || '')
		} catch (error) {
			theme = { dark: false }
		}
		this.theme = new BehaviorSubject<any>(theme)
		this.darkMode = this.theme.asObservable()
	}

	public get themeValue() {
		return this.theme.value
	}

	enableDarkMode() {
		try {
			const theme = JSON.parse(localStorage.getItem('theme') || '')
			if (theme && theme !== '' && theme.dark) {
				this.toggleDarkTheme(true)
				this.theme.next({
					dark: true,
				})
			} else {
				this.toggleDarkTheme(false)
				this.theme.next({
					dark: false,
				})
			}
		} catch (error) {}
	}

	toggleDarkTheme(dark: boolean) {
		console.log(dark)
		// Add or remove the "dark" class
		document.body.classList.toggle('dark', dark);
		localStorage.setItem(
			'theme',
			JSON.stringify({
				dark,
			})
		)
		const prefersDark = window.matchMedia('(prefers-color-scheme: dark)')
		// Listen for changes to the prefers-color-scheme media query
		prefersDark.addListener((e) => {
			console.log(e.matches)
		})
		this.theme.next({ dark })
	}
}
