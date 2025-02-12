import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.scss'
})
export class PageHeaderComponent {
  @Input() pageIndex?: number;
  @Input() pageSize?: number;
  @Input() totalCount?: number;
}
