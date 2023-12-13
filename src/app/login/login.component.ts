import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  public login: FormGroup = new FormGroup([]) ;
  error: string = "";
  

  constructor(private authService: AuthService, private _formBuilder:FormBuilder, private router: Router) {
    this.login =  this._formBuilder.group({
      username: new FormControl({value:'',disabled:false},Validators.required),
      password: new FormControl({value:'',disabled:false},Validators.required)

    })
  }

  ngOnInit(): void {
    this.authService.logout()
  }

  iniciarSesion(): void {
    if (this.authService.login(this.login.controls['username'].value,this.login.controls['password'].value)) {
      console.log(this.login.controls['username'].value + " " +  this.login.controls['password'].value)
      this.error= "";
      this.router.navigate(['/home']);
    } else {
      this.error= "Usuario o contraseña incorrecta";
    }
  }

  limpiarError():void{
    this.error= "";

  }
}
