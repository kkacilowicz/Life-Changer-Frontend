import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuClickService {

  constructor() { }

  klikniety: boolean = false;
  show(){
    this.klikniety = !this.klikniety;
    console.log("wywolane show")
    console.log(this.klikniety)
  }
}
