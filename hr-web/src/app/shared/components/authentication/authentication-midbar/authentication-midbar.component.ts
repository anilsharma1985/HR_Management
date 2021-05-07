import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-authentication-midbar',
  templateUrl: './authentication-midbar.component.html',
  styleUrls: ['./authentication-midbar.component.css'],
})
export class AuthenticationMidbarComponent implements OnInit {
  itemclicked: string = 'login';
  constructor() {}

  ngOnInit(): void {
    console.log('amar', this.itemclicked);
  }
}
