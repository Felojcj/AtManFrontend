import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoreService {
  private refreshAttendance: BehaviorSubject<any> = new BehaviorSubject<any>(null)
  public refreshAttendanceObservable = this.refreshAttendance.asObservable()

  constructor(private http: HttpClient) {}

  refreshAttendanceData() {
    this.refreshAttendance.next(true)
  }

  getFromApi = <T>(url: string, params?: string): Promise<any> => {
    return lastValueFrom(this.http.get<T>(url + (params || '')));
  };

  postToApi = <T>(url: string, body: any, params?: string): Promise<any> => {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return lastValueFrom(
      this.http.post<T>(url + (params || ''), body, { headers })
    );
  };

  updateFromApi = <T>(url: string, body: any, params?: string): Promise<any> => {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return lastValueFrom(
      this.http.put<T>(url + (params || ''), body, { headers })
    );
  }

  deleteFromApi = <T>(url: string, params?: string): Promise<any> => {
    return lastValueFrom(this.http.delete<T>(url +  (params || '')))
  }
}
