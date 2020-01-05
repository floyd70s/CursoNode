import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service'
import {User} from '../models/user'

@Component({
    selector: 'user-edit',
    templateUrl: '../views/user-edit.html',
    providers:[UserService]
})

export class UserEditComponent implements OnInit {
    public titulo: string
    public user: User
    public identity
    public token
    
    constructor (private _userService: UserService){
        this.titulo= 'Actualizar mis datos'
     }

    ngOnInit() { 
        console.log('user-edit.component.ts cargado')
    }
}
