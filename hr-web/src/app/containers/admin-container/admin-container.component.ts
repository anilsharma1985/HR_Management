import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-container',
  templateUrl: './admin-container.component.html',
  styleUrls: ['./admin-container.component.css'],
})
export class AdminContainerComponent implements OnInit {
  toggle = false;
  constructor() {}

  ngOnInit(): void {}
  public toggleMenu(response: boolean): void {
    this.toggle = response;
    debugger;
  }
}
