import { Component, Input } from '@angular/core';
import { PartialRoute } from '../../models/routes.model';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  @Input() routes : PartialRoute[] = []
}
