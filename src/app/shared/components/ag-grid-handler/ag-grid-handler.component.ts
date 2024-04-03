import { ChangeDetectorRef, Component, Input, TemplateRef } from '@angular/core';
import { ColumnApi, GridApi, GridOptions, IDatasource, IGetRowsParams } from 'ag-grid-community';
import { GridHandlerService } from '../../services/grid-handler.service';
import { HttpParams } from '@angular/common/http';
import { Message } from 'primeng/api';
import { isNullOrUndefined } from 'src/app/app.component';

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
  @Input() rowOption: string = "single"
  @Input() paginationPageSize: number = 10;
  @Input() pagination: boolean = true;
  @Input() gridHeaderTemplate!: TemplateRef<any>;
  @Input() cellRendererComponents: any
  cacheBlockSize: number = this.paginationPageSize;
  messagesList: Message[] = [];

  gridOptions!: GridOptions;
  private gridApi!: GridApi;

  autoGroupColumnDef = {
    resizable: true,
    cellRendererParams: {
      checkbox: true
    }
  }

  constructor(
    private gridHandler: GridHandlerService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.gridOptions = {
      rowModelType: 'infinite',
      pagination: this.pagination,
      paginationPageSize: this.paginationPageSize,
      cacheBlockSize:  this.paginationPageSize, // Equal to paginationPageSize
      maxBlocksInCache: 0, // Disables caching
      valueCache: false,
      suppressDragLeaveHidesColumns: true,
      onColumnVisible: this.onColumnVisible.bind(this),
      onColumnMoved: this.onColumnMoved.bind(this),
      onPaginationChanged: this.onPaginationChanged.bind(this)
    }
  }

  prepareDataSource(component : AgGridHandlerComponent) : IDatasource {
    return {
      rowCount: 0,
      getRows(params: IGetRowsParams) {
        component.gridApi.showLoadingOverlay();
        if(!!component.messagesList && component.messagesList.length > 0)
          component.messagesList.splice(0,component.messagesList.length);
        let httpParams = new HttpParams()
          .set('page', params.startRow / (params.endRow - params.startRow))
          .set('size', params.endRow - params.startRow)
          .set('sortBy', !isNullOrUndefined(params.sortModel[0]) ? `${params.sortModel[0].colId},${params.sortModel[0].sort}` : '');
        let filterObj = {
          filters: component.prepareTextFilterObject(params.filterModel) || {}
        };
        component.gridHandler.getRows(component.gridName, httpParams, filterObj)
          .subscribe({
            next: (response) => {
              params.successCallback(response.rowData.content, response.rowData.totalElements);
              setTimeout(() => {
                component.gridApi.hideOverlay();
              }, 500);
              // component.gridApi.sizeColumnsToFit();
            },
            error: (err: any) => {
              params.failCallback();
              component.gridApi.hideOverlay();
              component.pushErrorMessage();
              component.cdr.detectChanges();
            }
          }
        )
      }
    }
  }

  setColumnDef() {
    if(localStorage.getItem(`${this.gridName}ColumnState`) !== null) {
      this.gridApi.setGridOption('columnDefs', JSON.parse(localStorage.getItem(`${this.gridName}ColumnState`) || ""));
    } else {
      this.gridHandler.retrieveColumnDef(this.gridName)
        .subscribe((response) => {
          var columnDef = this.processColumns(response.columnInfo);
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
        headerName: col.name,
        field: col.field,
        minWidth: col.metaData.width || '200',
        // type: col.type || 'text',
        sortable: col.metaData.sortable || false,
        resizable: col.metaData.resizable || false,
        filter: col.applyFilter ? col.filter || 'agTextColumnFilter' : null,
        ...(col.filter !== null && {
          filter: true,
          filterParams: {
            suppressAndOrCondition: true,
            newRowsAction: 'keep',
            resetButton: true,
            applyButton: true
          }
        }),
        ...(!!col.metaData.cellRenderer && {
          cellRenderer: col.metaData.cellRenderer
        })
      }
    })
  }

  private pushErrorMessage() {
    if(this.messagesList == null)
      this.messagesList = [];
    this.messagesList = [{
      severity: 'error',
      summary: 'Error',
      detail: 'Internal Server Error'
    }]
  }
  private onColumnVisible(eventData: any) {
    console.log("eventData", eventData);
  }

  private onColumnMoved(eventData: any) {
    console.log("eventData", eventData);
  }

  private onPaginationChanged(event: any) {
    if (this.pagination && event.newPageSize) {
      // this.cacheBlockSize = event.api.paginationGetPageSize();
      // this.gridOptions.cacheBlockSize = event.newPageSize;
      this.gridApi.setGridOption('cacheBlockSize', event.api.paginationGetPageSize());
      this.gridApi.purgeInfiniteCache();
    } else if(this.pagination && event.newPage) {
      this.gridApi.purgeInfiniteCache();
    }
  }

  addColumnFilters(filterByObj: any) {
    this.gridApi.setFilterModel(filterByObj);
    this.gridApi.onFilterChanged();
  }

  prepareTextFilterObject(filterObject: any) {
    let columns: string[] = Object.keys(filterObject);
    let processedFilterObject: {[column: string]: string} = {};
    columns.forEach(col => {
      let filterValue = filterObject[col]['filter']
      switch(filterObject[col]['type']) {
        case 'startsWith':
          processedFilterObject[col] = new RegExp('^' + filterValue).toString()
          break;
        case 'contains':
          processedFilterObject[col] = new RegExp(filterValue).toString()
          break;
        case 'endsWith':
          processedFilterObject[col] = new RegExp(filterValue + '$').toString();
          break;
        case 'equals':
          processedFilterObject[col] = new RegExp('^' + filterValue + '$').toString();
          break;
        default:
          break;
      }
    });
    return processedFilterObject;
  }

}
