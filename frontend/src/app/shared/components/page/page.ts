import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page',
  standalone: false,
  templateUrl: './page.html',
  styleUrl: './page.scss',
})
export class Page {
  @Input() title : string | undefined;
}
