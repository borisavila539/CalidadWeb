import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './Interfaces/user.interface';
import { Router } from '@angular/router';
import { responseInterface } from './Interfaces/response.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://10.100.2.17:8092/api/PantsQuality'//10.100.1.11:8091
  private loggedIn = false;
  private response: User[] = [];
  private formData: FormData = new FormData();
  constructor(private http: HttpClient, private router: Router) {

  }

  login(username: string, password: string): boolean {
    try {
      this.http.get<User[]>(`${this.apiUrl}/usuario/${username}/${password}`).subscribe((datos) => {
        if (datos.length > 0) {
          this.loggedIn = true;
          this.router.navigate(['/home']);

        } else {
          this.loggedIn = false;

        }
      })
      return this.loggedIn
    } catch (err) {
      return false;
    }

  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  logout(): void {
    this.loggedIn = false;
  }

  /*async sendFiles(file: File[]): Promise<responseInterface[]|undefined> {
    var cont = 0;

    file.forEach(item => {
      this.formData.append(`file${cont + 1}`, item, item.name)
      cont++;
    })
    
    return await this.http.post<responseInterface[]>(`${this.apiUrl}/subirarchivo`, this.formData).toPromise();
  }*/

  sendFiles(file: File[]):Observable<responseInterface[]>{
    var cont = 0;
    this.formData = new FormData();
    file.forEach(item => {
      this.formData.append(`file${cont + 1}`, item, item.name)
      cont++;
    })
    //debugger
    return this.http.post<responseInterface[]>(`${this.apiUrl}/subirarchivo`, this.formData);

  }
}
