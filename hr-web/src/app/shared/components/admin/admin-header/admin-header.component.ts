import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css'],
})
export class AdminHeaderComponent implements OnInit {
  @Output() onToggle = new EventEmitter<boolean>();
  toggle = false;

  constructor() {}

  ngOnInit(): void {}
  toggleMenu() {
    debugger
    this.toggle = !this.toggle;
    this.onToggle.emit(this.toggle);
    debugger;
  }
}
