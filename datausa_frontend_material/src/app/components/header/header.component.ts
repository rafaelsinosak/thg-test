import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Input() isSidenavOpen: boolean = false;
  @Output() toggleSidenav = new EventEmitter<void>();

  onToggleSidenav() {
    this.toggleSidenav.emit();
  }
}
