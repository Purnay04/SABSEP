import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../../../../../api.config';

@Injectable({
  providedIn: 'root'
})
export class GridHandlerService {

  constructor(
    private http: HttpClient
  ) { }

  getRows(gridName: string, params: HttpParams, payload: any) : Observable<any>{
    return this.http.post(`${API_CONFIG.baseUrl}${API_CONFIG.adminEndpoints.GRID_ROWDATA}/${gridName.trim().toUpperCase()}`, payload, {params: params});
    //{params: params}
    // return this.http.get(`http://localhost:3000/${gridName}`);d
  }

  retrieveColumnDef(gridName: string) : Observable<any>{
    return this.http.get(`${API_CONFIG.baseUrl}${API_CONFIG.adminEndpoints.GRID_COLUMNINFO}/${gridName.trim().toUpperCase()}`);
    // return this.http.get(`http://localhost:3000/${gridName}Col`);
  }
}
