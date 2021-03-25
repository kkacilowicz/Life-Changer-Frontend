import { Injectable } from '@angular/core';
import { NgProgressRef } from '@ngx-progressbar/core';

@Injectable({
  providedIn: 'root'
})
export class ProgressBarService {

  // progressRef!: NgProgressRef;

  constructor() { }

  startLoading() {
    // this.progressRef.start()
  }

  completeLoading() {
    // this.progressRef.complete();
  }
}
