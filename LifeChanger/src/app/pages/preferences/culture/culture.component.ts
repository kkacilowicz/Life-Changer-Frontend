import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-culture',
  templateUrl: './culture.component.html',
  styleUrls: ['./culture.component.sass']
})
export class CultureComponent implements OnInit {

  cultureImage = ['../../../assets/Images/Preferences/culture/film.jpg','../../../assets/Images/Preferences/culture/gry.jpg',
                  '../../../assets/Images/Preferences/culture/impreza.jpg','../../../assets/Images/Preferences/culture/koncert.jpg',
                  '../../../assets/Images/Preferences/culture/ksiazka.jpg','../../../assets/Images/Preferences/culture/sluchawki.jpg',
                  '../../../assets/Images/Preferences/culture/teatr.jpg',
                  ]             


  constructor() { }

  option16 = 9;
  option17 = 10;
  option18 = 11;
  option19 = 13;
  option20 = 14;
  option21 = 15;
  option22 = 16;

  ngOnInit(): void {
  }

}
