import { Component, Input } from '@angular/core';
import { ColumnApi, GridApi, GridOptions, IDatasource, IGetRowsParams } from 'ag-grid-community';
import { GridHandlerService } from '../../services/grid-handler.service';
import { HttpParams } from '@angular/common/http';

export type GridApiInfo = {
  url : string,
  params: any[]
}

@Component({
  selector: 'ag-grid-handler',
  templateUrl: './ag-grid-handler.component.html',
  styleUrls: ['./ag-grid-handler.component.scss']
})
export class AgGridHandlerComponent {
  @Input({required:true}) gridName!: string
  @Input({required:true}) gridApiInfo!: GridApiInfo;
  @Input() rowOption: string = "single"
  @Input() paginationPageSize: number = 10;
  cacheBlockSize: number = this.paginationPageSize;

  gridOptions!: GridOptions;
  private gridApi!: GridApi;

  autoGroupColumnDef = {
    resizable: true,
    cellRendererParams: {
      checkbox: true
    }
  }

  constructor(
    private gridHandler: GridHandlerService
  ) { }

  ngOnInit() {
    this.gridOptions = {
      rowModelType: 'infinite',
      pagination: true,
      paginationPageSize: this.paginationPageSize,
      cacheBlockSize: 0, // Equal to paginationPageSize
      maxBlocksInCache: 0, // Disables caching
      suppressDragLeaveHidesColumns: true,
      onColumnVisible: this.onColumnVisible.bind(this),
      onColumnMoved: this.onColumnMoved.bind(this),
      onPaginationChanged: this.onPaginationChanged.bind(this)
    }
  }

  prepareDataSource(component : AgGridHandlerComponent) : IDatasource {
    return {
      getRows(params: IGetRowsParams) {
        let httpParams = new HttpParams()
          .set('page', params.startRow)
          .set('size', params.endRow)
          .set('sort', JSON.stringify(params.sortModel))
          .set('filters', JSON.stringify(params.filterModel));
        component.gridHandler.getRows(component.gridName, httpParams)
          .subscribe((response) => {
            params.successCallback(response.rowData, response.totalRows);
        })
      }
    }
  }

  setColumnDef() {
    if(localStorage.getItem(`${this.gridName}ColumnState`) !== null) {
      this.gridApi.setGridOption('columnDefs', JSON.parse(localStorage.getItem(`${this.gridName}ColumnState`) || ""));
    } else {
      this.gridHandler.retrieveColumnDef(this.gridName)
        .subscribe((response) => {
          var columnDef = this.processColumns(response);
          this.gridApi.setGridOption('columnDefs', columnDef);
          localStorage.setItem(`${this.gridName}ColumnState`, JSON.stringify(columnDef));
      });
    }
  }

  onGridReady(params: {api: GridApi; columnApi: ColumnApi}) {
    this.gridApi = params.api;
    this.gridApi.updateGridOptions({ datasource: this.prepareDataSource(this)});
    this.setColumnDef();
  }

  private processColumns(colDef: any[]) : any[]{
    return colDef.map(col => {
      return {
        headerName: col.columnName,
        field: col.field,
        width: col.width,
        // type: col.type || 'text',
        sortable: col.sortable || false,
        resizable: true,
        filter: col.applyFilter ? col.filter || 'agTextColumnFilter' : null,
        ...(col.filter !== null && {
          filter: true,
          filterParams: {
            newRowsAction: 'keep',
            resetButton: true,
            applyButton: true
          }
        })
      }
    })
  }

  private onColumnVisible(eventData: any) {
    console.log("eventData", eventData);
  }

  private onColumnMoved(eventData: any) {
    console.log("eventData", eventData);
  }

  private onPaginationChanged(event: any) {
    if (event.newPageSize) {
      // this.cacheBlockSize = event.api.paginationGetPageSize();
    }
  }

}
