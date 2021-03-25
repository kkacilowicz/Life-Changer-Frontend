import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.sass']
})
export class NavComponent implements OnInit {
  showAdded = false;
  id = 0;
  constructor() { }

  ngOnInit(): void {
  }

  clicked() {
    this.showAdded = !this.showAdded;
  }

}
