import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from 'src/app/api.config';

@Injectable({
  providedIn: 'root'
})
export class AdminCoreService {

  constructor(
    private http: HttpClient
  ) { }

  getExamConfiguration() : Observable<any>{
    return this.http.get(`${API_CONFIG.baseUrl}${API_CONFIG.adminEndpoints.VIEW_TEST_CONFIG}`);
  }

  saveExamConfiguration(formResponse: any) : Observable<any>{
    return this.http.post(`${API_CONFIG.baseUrl}${API_CONFIG.adminEndpoints.SAVE_TEST_CONFIIG}`, formResponse);
  }
}
