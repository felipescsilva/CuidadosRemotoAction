import { Component, OnInit } from '@angular/core';

interface UserRole {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss']
})
export class LoginRegisterComponent implements OnInit {

  UserRole: UserRole[] = [{value: 'resp', viewValue: 'Responsável'},{value: 'idoso', viewValue: 'Idoso(a)'},{value: 'saude', viewValue: 'Prof. Saúde'}];

  constructor() { }

  ngOnInit(): void {
  }

}
