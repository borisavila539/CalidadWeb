import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  @Input() accept = '.xlsx'
  disabled: boolean = false
  fileList: File[] = [];

  constructor(private authService: AuthService, private router: Router) {

  }
  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(["/login"])
    }
  }

  onclick(): void {

    this.disabled = true;
    const selectedFile = (document.getElementById('fileupload') as HTMLInputElement).files;
    var resp = this.authService.sendFiles(Array.from(selectedFile||[]))
    console.log(resp)

    this.disabled = false;
  }

}
