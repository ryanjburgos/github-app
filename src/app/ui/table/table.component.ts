import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

export interface DataTable {
  column: string[];
  dataRows: DataRowObject[];
}

export interface DataRow {
  data: any;
  type: 'text' | 'image' | 'date' | 'link';
}

export interface DataRowObject {
  [key: string]: DataRow;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit, OnChanges {
  /**
   * @Input
   * @name data
   * @type Array<any>
   * @description array of data to be displayed in the table
   */
  @Input() data: Array<any> = new Array<any>();

  /**
   * @Input
   * @name emptyMessage
   * @type string
   * @description empty message
   */
  @Input() emptyMessage: string = 'No records';

  /**
   * @Input
   * @name filterColumns
   * @type  Array<string>
   * @description used to filter columns
   */
  @Input() filterColumns!: Array<keyof DataRowObject>;

  /**
   * @Input
   * @name dataFormat
   * @type  string
   * @description used to define the date format
   */
  @Input() dataFormat: string = 'dd/MM/YYYY';

  /**
   * @Output
   * @name dataFormat
   * @type  string
   * @description used to define the date format
   */
  @Output() rowClick$: EventEmitter<DataRowObject> = new EventEmitter<DataRowObject>();

  /**
   * @name dataTable
   * @type DataTable
   * @description is the interface for customizing the table
   */
  public dataTable: DataTable = {} as DataTable;

  constructor() {}

  public ngOnInit(): void {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes['data'] && changes['data'].currentValue) {
      this.data = changes['data'].currentValue;
    }
    if (this.data?.length > 0) {
      this.dataTable.dataRows = [...this.data];
      this.dataTable.column = Object.keys(this.data[0]);
      if (this.filterColumns) {
        this.dataTable.column = this.dataTable.column.filter((key) => this.filterColumns.includes(key));
      }
    }
  }
  /**
   * used to handle the click on single row and emit the DataRowObject
   * @param  {DataRowObject} dataRowObject
   * @returns void
   */
  public onRowClick(dataRowObject: DataRowObject): void {
    this.rowClick$.emit(dataRowObject);
  }
}
