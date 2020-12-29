import { Component, OnInit } from '@angular/core';
import { AuthStateService } from 'src/app/core/authentication/Auth-state';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  showLoginButton = false;

  constructor(private auth: AuthStateService) { }

  ngOnInit() {
    setTimeout(() => {
      this.showLoginButton = true;
    }, 1000);
  }

  signInOkta() {
    this.auth.signIn();
  }


}
