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
  public alertRegister

  constructor(
    private _userService: UserService
  ) {
    this.user = new User('', '', '', '', '', 'ROLE_USER', '')
    this.user_register = new User('', '', '', '', '', 'ROLE_USER', '')
  }

  ngOnInit() {
    this.identity = this._userService.getIdentity()
    this.token = this._userService.getToken()
  }

  public onSubmit() {
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
                localStorage.setItem('token',token)
                
                //limpiar usuario
                this.user = new User('', '', '', '', '', 'ROLE_USER', '')
              }
            },
            error => {
              var errorMessage = <any>error
              if (errorMessage != null) {
                var body = JSON.parse(error._body)
                this.errorMessage = body.message
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
          this.user = new User('', '', '', '', '', 'ROLE_USER', '')
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
    this.user = new User('', '', '', '', '', 'ROLE_USER', '')
  }

  onSubmitRegister(){
    console.log('name:'+this.user_register.name)
    console.log('surname:'+this.user_register.surname)
    console.log('email:'+this.user_register.email)
    console.log('password:'+this.user_register.password)

    this._userService.register(this.user_register).subscribe (
      response=>{
          let user=response.user
          this.user_register=user
          if(!user._id){
            this.alertRegister ='error al registrarse'
          }else{
            this.alertRegister ='Registro realizado correctamente, identificate con :' + this.user_register.email
            this.user_register = new User('', '', '', '', '', 'ROLE_USER', '')
          }
      },error=>{
        var errorMessage = <any>error

        if (errorMessage != null) {
          var body = JSON.parse(error._body)
          this.alertRegister = body.message
          console.log('Error en el registro :' + error)
          
        }
      }
    )

  }


}
