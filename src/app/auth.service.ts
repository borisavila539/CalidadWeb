import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './Interfaces/user.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5001/api/PantsQuality'
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

  sendFiles(file: File[]): boolean {
    var resp: boolean = false
    var cont = 0;

    file.forEach(item =>{
      this.formData.append(`file${ cont+ 1}`, item, item.name)
      cont++;
    })
    this.http.post<string>(`${this.apiUrl}/subirarchivo`, this.formData).subscribe(response => {
      resp = (response = "SI") ? true : false
    })
    return resp;
  }
}
