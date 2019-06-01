import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../models/user.model';
import { environment } from '../../../environments/environment';

@Injectable()
export class UserService {
    private BASE_URL: string = environment.api_url;
    private END_POINT: string = 'users';

    constructor(private http: HttpClient) {
       
    }

    getUsers(): Observable<User[]> {
      const API_URL = `${this.BASE_URL}/${this.END_POINT}`;

      return this.http.get<User[]>(API_URL);
    }

    getUserById(id: number): Observable<User> {
        const API_URL = `${this.BASE_URL}/${this.END_POINT}/${id}`;

        return this.http.get<User>(API_URL);
    }

    deleteUser(id: number): Observable<{}> {
        const API_URL = `${this.BASE_URL}/${this.END_POINT}/${id}`;
        return this.http.delete(API_URL);
    }

    updateUser(user: User): Observable<User> {
        const API_URL = `${this.BASE_URL}/${this.END_POINT}/${user.id}`;
        return this.http.put<User>(API_URL, user);
    }
    createUser(user: User): Observable<User> {
        const API_URL = `${this.BASE_URL}/${this.END_POINT}`;

        return this.http.post<User>(API_URL, user);
    }
}
