import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from 'src/app/api.config';

@Injectable({
  providedIn: 'root'
})
export class GridHandlerService {

  constructor(
    private http: HttpClient
  ) { }

  getRows(gridName: string, params: HttpParams) : Observable<any>{
    // return this.http.get(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.ADMIN_LOGIN}`, {params: params});
    return this.http.get(`http://localhost:3000/${gridName}`);
  }

  retrieveColumnDef(gridName: string) : Observable<any>{
    return this.http.get(`http://localhost:3000/${gridName}Col`);
  }
}
