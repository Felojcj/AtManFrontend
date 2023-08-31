import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  constructor(private http: HttpClient) { }

  getFromApi = <T>(url: string, params?: string) : Promise<any> => {
    return lastValueFrom(this.http.get<T>(url + (params || '')))
  }

  //For post     // const headers = new HttpHeaders({
    //   "content-type": "appl..."
    // })
}
