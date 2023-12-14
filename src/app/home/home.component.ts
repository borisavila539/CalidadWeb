import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { responseInterface } from '../Interfaces/response.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  @Input() accept = '.xlsx'
  disabled: boolean = false
  fileList: File[] = [];
  buttonText: string = "Enviar";
  respuesta: responseInterface[] = [];

  constructor(private authService: AuthService, private router: Router) {

  }
  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(["/login"])
    }
  }

  onclick(): void {

    this.disabled = true;
    this.buttonText = "";
    const selectedFile = (document.getElementById('fileupload') as HTMLInputElement).files;
    this.respuesta = [];
    if ((selectedFile?.length ? selectedFile?.length : 0) > 0) {
      this.authService.sendFiles(Array.from(selectedFile || [])).then(resp => {
        this.respuesta = resp ? resp : []
        this.buttonText = "Enviar";
        this.disabled = false;
      })

    }
  }
}
