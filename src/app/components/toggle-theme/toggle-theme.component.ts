import { Component, Input, OnInit } from '@angular/core';
import { DarkModeService } from 'src/app/services/dark-mode.service';

@Component({
  selector: 'app-toggle-theme',
  templateUrl: './toggle-theme.component.html',
  styleUrls: ['./toggle-theme.component.scss'],
})
export class ToggleThemeComponent implements OnInit {

  @Input() value!: boolean;
  constructor(public darkModeService: DarkModeService) {
    this.value = darkModeService.themeValue.dark;
   }

  ngOnInit() {}

}
