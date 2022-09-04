import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  /**
   * @Input
   * @name label
   * @description button label
   *
   */
  @Input() public label!: string;

  /**
   * @Input
   * @name colorType
   * @type {| 'btn-primary' | 'btn-secondary' | 'btn-success' | 'btn-danger' | 'btn-warning' | 'btn-info' | 'btn-light' | 'btn-dark' | 'btn-link'}
   * @description this is the type that define the color and style of the button
   */
  @Input() public colorType:
    | 'btn-primary'
    | 'btn-secondary'
    | 'btn-success'
    | 'btn-danger'
    | 'btn-warning'
    | 'btn-info'
    | 'btn-light'
    | 'btn-dark'
    | 'btn-link' = 'btn-primary';

  /**
   * @Input
   * @name type
   * @type { 'button' | 'submit' | 'menu' | 'reset' }
   * @description used to disable the button
   */
  @Input() public typeName: 'button' | 'submit' | 'menu' | 'reset' = 'button';

  /**
   * @Input
   * @name additionalClasses
   * @type {string}
   * @description used to add additional classes
   */
  @Input() public additionalClasses: string = '';

  /**
   * @Input
   * @name isDisabled
   * @type {boolean}
   * @description used to disable the button
   */
  @Input() public isDisabled: boolean = false;

  /**
   * @Output
   * @name click$
   * @type {EventEmitter<MouseEvent>}
   * @description used to emit the click of button
   */
  @Output() public click$: EventEmitter<void> = new EventEmitter();

  constructor() {}

  public ngOnInit(): void {}

  public onClick(): void {
    this.click$.emit();
  }
}
