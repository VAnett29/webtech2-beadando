import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from '../models/login.model';
const baseUrl = 'http://localhost:8080/api/logins';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loggedIn: Boolean = false;

  public isLoggedIn() : Boolean
  {
    return this.loggedIn;
  }

  constructor(private http: HttpClient) {
    console.log("login service created");
   }
  getAll(): Observable<Login[]> {
    return this.http.get<Login[]>(baseUrl);
  }
  get(id: any): Observable<Login> {
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
  findByEmail(email: any): Observable<Login[]> {
    return this.http.get<Login[]>(`${baseUrl}?email=${email.email}`);
  }

  async emailExists(email: string) : Promise<Boolean>
  {
    let exists = false;
    await this.findByEmail(
      { email: email }
      ).forEach(value =>
    {
      value.forEach( (l) =>{
        if(l.email === email) exists = true;
      })
    })
    return exists;
  }

  async registerUser(email: string, password: string) : Promise<Boolean>
  {
    if(await this.emailExists(email))
      return false;

    let success = false;
    await this.create(
      { email: email, 
        password: password}
      ).forEach(value =>
    {
      if(value.email === email && value.password === password) success = true;
    })
    if(success)
      console.log("Registered user")
    else
      console.log("Reg failed");
    return success;
  }

  async loginUser(email: string, password: string) : Promise<Boolean>
  {
    let success = false;
    await this.findByEmail(
      { email: email }
      ).forEach(value =>
    {
      value.forEach( (l) =>{
        if(l.email === email && l.password === password) success = true;
      })
    })
    if(success)
      console.log("User logged in")
    else
      console.log("Failed login");
    this.loggedIn = success;
    return success;
  }

  public logoutUser() : Boolean
  {
    this.loggedIn = false;
    return true;
  }
}
