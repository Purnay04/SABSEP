import { Component } from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular";
import { ICellRendererParams } from "ag-grid-community";

@Component({
  selector: 'tc-grid-cell-renderer',
  template: ``
})
export class TCGridCellRendererComponent implements ICellRendererAngularComp {
  params!: any;

  agInit(params: ICellRendererParams<any, any, any>): void {
    this.params = params;
    console.log('TCGridCellRendererComponent', params);
  }

  refresh(params: ICellRendererParams<any, any, any>): boolean {
    this.params = params;
    return true;
  }

}