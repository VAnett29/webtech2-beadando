import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Horse } from '../models/horse.model';
const baseUrl = 'http://localhost:8080/api/horses';
@Injectable({
  providedIn: 'root'
})
export class HorseService {
  constructor(private http: HttpClient) { }
  getAll(): Observable<Horse[]> {
    return this.http.get<Horse[]>(baseUrl);
  }
  get(id: any): Observable<Horse> {
    return this.http.get(`${baseUrl}/${id}`);
  }
  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }
  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }
  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }
  findByName(name: any): Observable<Horse[]> {
    return this.http.get<Horse[]>(`${baseUrl}?name=${name}`);
  }

  async addHorse(id: any, name: string, sex: string, born: Date, color: string, height: number): Promise<Boolean> {
    let success = false;
    if (id === '0') {
      await this.create(
        {
          name: name,
          sex: sex,
          born: born,
          color: color,
          height: height
        }
      ).forEach(value => {
        if (value.name === name) success = true;
      })
    }
    else {
      await this.update(id,
        {
          name: name,
          sex: sex,
          born: born,
          color: color,
          height: height
        }
      ).forEach(value => {
        if (value.message === 'Horse was updated successfully.') success = true;
      })
    }
    if (success)
      console.log("added horse")
    else
      console.log("failed to add horse");
    return success;
  }
}
