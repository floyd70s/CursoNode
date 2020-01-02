import { Injectable } from '@angular/core'
import { Http, Response, Headers } from '@angular/http'
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable'
import { GLOBAL } from './global'

 
@Injectable()
export class UserService {
    public url: string

    constructor(private _http: Http) {
        this.url = GLOBAL.url
    }

    signup(user_to_login, gethash = null) {
        if (gethash != null) {
            user_to_login.gethash = gethash
        }
        let json = JSON.stringify(user_to_login)
        let params = json
        let headers = new Headers({ 'Content-Type': 'application/json' })
        
        console.log(this.url+ 'login')
        console.log('params'+params)

        return this._http.post(this.url + 'login', params, { headers: headers })
            .map(res => res.json())

            
    }
}