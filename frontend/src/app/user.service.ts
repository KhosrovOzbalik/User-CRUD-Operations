import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from './user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/user';

  constructor(private http: HttpClient) {}

  // GET all users
  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.apiUrl}`);
  }

  // GET a specific user by id
  getUser(id: string): Observable<IUser> {
    return this.http.get<IUser>(`${this.apiUrl}/${id}`);
  }

  // GET users by name and surname
  findUsersByNameAndSurname(
    name: string,
    surname: string
  ): Observable<IUser[]> {
    // Create a URL with query parameters
    const url = `${this.apiUrl}/search?name=${name}&surname=${surname}`;
    return this.http.get<IUser[]>(url);
  }

  // POST a new user
  createUser(user: IUser): Observable<any> {
    return this.http.post(`${this.apiUrl}`, user);
  }

  // PUT to update a user
  updateUser(id: string, user: Partial<IUser>): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, user);
  }

  // DELETE a user
  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
