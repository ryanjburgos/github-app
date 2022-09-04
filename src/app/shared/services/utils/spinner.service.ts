import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  private _isLoading: Subject<boolean> = new Subject<boolean>();

  public get isLoading$(): Observable<boolean> {
    return this._isLoading.asObservable();
  }

  constructor(private ngxSpinner: NgxSpinnerService) {}

  public show(): void {
    this._isLoading.next(true);
    this.ngxSpinner.show();
  }

  public hide(): void {
    this._isLoading.next(false);
    this.ngxSpinner.hide();
  }
}
