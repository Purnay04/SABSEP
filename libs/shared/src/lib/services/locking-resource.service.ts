import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from 'api.config';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LockingResourceService {

  constructor(
    private http: HttpClient
  ) { }

  isResourceLocked(resourceName: string) : Observable<any>{
    return this.http.get(`${API_CONFIG.baseUrl}${API_CONFIG.generalEndpoints.LOCK_RESOURCE}/${resourceName}`);
  }

  lockResource(resourceName: string) : Observable<any>{
    // return this.http.post(`${API_CONFIG.baseUrl}${API_CONFIG.generalEndpoints.LOCK_RESOURCE}/${resourceName}`, {});
    return of(true);
  }

  unlockResource(resourceName: string) : Observable<any>{
    // return this.http.delete(`${API_CONFIG.baseUrl}${API_CONFIG.generalEndpoints.LOCK_RESOURCE}/${resourceName}`);
    return of(true);
  }
}
