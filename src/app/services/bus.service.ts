import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bus } from './bus';

@Injectable({
  providedIn: 'root'
})
export class BusService {
  private apiUrl = 'http://localhost:8083/bus'; // Replace with your actual API endpoint

  constructor(private http: HttpClient) { }

  getBuses(): Observable<Bus[]> {
    return this.http.get<Bus[]>(`${this.apiUrl}/getAll`);
  }

  createBus(bus: Bus): Observable<Bus> {
    return this.http.post<Bus>(`${this.apiUrl}/bus`, bus);
  }

  updateBus(bus: Bus): Observable<Bus> {
    return this.http.put<Bus>(`${this.apiUrl}/${bus.id}`, bus);
  }

  deleteBus(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/bus/${id}`);
  }
}
