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
  public user_register: User
  
  public identity
  public token
  public errorMessage

  constructor(
    private _userService: UserService
  ) {
    this.user = new User('', '', '', '', '', 'ROLE_USER', '')
    this.user_register = new User('', '', '', '', '', 'ROLE_USER', '')
  }

  ngOnInit() {
    this.identity = this._userService.getIdentity()
    this.token = this._userService.getToken()
    console.log('-this.identity:' + this.identity)
    console.log('-this.token' + this.token)
  }

  public onSubmit() {
    console.log(this.user)

    //conseguir los datos del usuario identificado
    this._userService.signup(this.user).subscribe(
      response => {
        let identity = response.user
        this.identity = identity
        if (!this.identity._id) {
          alert('el usuario no esta correctamente identificado')
        } else {
          //crear elelmento en el localstorage para tener al usuario sesion
          //conseguir el token
          this._userService.signup(this.user, 'true').subscribe(
            response => {
              let token = response.token
              this.token = token
              if (this.token <= 0) {
                alert('Token no generado')
              } else {
                //crear elelmento en el localstorage para tener el token disponible
                //conseguir el token para enviarlo a cada peticion http

                console.log('T: ' + token)
                console.log('I: ' + identity)

              }
            },
            error => {
              var errorMessage = <any>error
              if (errorMessage != null) {
                var body = JSON.parse(error._body)
                this.errorMessage = body.message
                console.log('Entra en el error 1:' + error)
              }
            }
          )
        }
      },
      error => {
        var errorMessage = <any>error

        if (errorMessage != null) {
          var body = JSON.parse(error._body)
          this.errorMessage = body.message
          //this.errorMessage=error
          console.log('Entra en el error 2:' + error)
          this.user.email = ""
          this.user.password = ""
        }
      }
    )
  }

  logout() {
    localStorage.removeItem('identity')
    localStorage.removeItem('token')
    localStorage.clear()
    this.identity = null
    this.token = null
    this.user.email = ""
    this.user.password = ""
  }

  onSubmitRegister(){
    console.log('this.user_register'+this.user_register)
  }


}
