import { Injectable } from '@angular/core';
import { NgProgressRef } from '@ngx-progressbar/core';


@Injectable({
  providedIn: 'root'
})
export class ProgressBarService {

  progressRef: NgProgressRef;
  default: string = "blue";
  succes: string = "green";
  error: string = "red";
  currentColor: string = this.default;
  constructor() { }

  startLoading() {
    this.currentColor = this.default;
    this.progressRef.start()
  }

  completeLoading() {
    this.progressRef.complete();
  }

  setSucces() {
    this.currentColor = this.succes;
  }
  setError() {
    this.currentColor = this.error;
  }
}
