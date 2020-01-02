import { Component, OnInit } from '@angular/core';
import { User } from './models/user'
import { UserService } from './services/user.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [UserService]
})
export class AppComponent implements OnInit {
  public title = 'Musify';
  public user: User
  public identity
  public token

  constructor(
    private _userService: UserService
  ) {
    this.user = new User('', '', '', '', '', 'ROLE_USER', '')
  }

  ngOnInit() {
  }

  public onSubmit() {
    console.log('entra al onSubmit')
    //console.log(this.user)
    this._userService.signup(this.user).subscribe(
      response => {
        console.log('respuesta:')
        console.log(response)
      },
      error => {
        console.log('error')
        var errorMessage = <any>error
        if (errorMessage != null) {
          console.log(error)
        }
      }
    )
  }

}
