import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { API_CONFIG } from '../../../../../../api.config';

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

  addQuestion(payload: any): Observable<any> {
    return this.http.post(`${API_CONFIG.baseUrl}${API_CONFIG.adminEndpoints.ADD_QUESTION}`, payload);
  }

  getAllCategories() : Observable<any> {
    return this.http.get(`${API_CONFIG.baseUrl}${API_CONFIG.adminEndpoints.GET_CATEGORIES_LIST}`);
  }

  addCategory(payload: any): Observable<any> {
    return this.http.post(`${API_CONFIG.baseUrl}${API_CONFIG.adminEndpoints.ADD_CATEGORY}`, payload);
  }

  getQuestion(qid: string) : Observable<any> {
    return this.http.get(`${API_CONFIG.baseUrl}${API_CONFIG.adminEndpoints.GET_QUESTION}/${qid}`);
  }

  deleteQuestion(qid: string) : Observable<any> {
    return of(true);
    // return this.http.delete(`${API_CONFIG.baseUrl}${API_CONFIG.adminEndpoints.GET_QUESTION}/${qid}`);
  }
}
