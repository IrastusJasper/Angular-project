import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject, catchError, tap } from "rxjs";
import { throwError } from "rxjs";
import { User } from "./user.model";

export interface AuthResponseData{
    idToken: string;
    email: string;
    refreshToken: string
    expiresIn: string;
    localId: string;
    registered?:boolean;
}

@Injectable({
    providedIn: 'root'
})

export class AuthService{
    user = new Subject<User>();

    constructor(private http: HttpClient){}
    
    signUp(email: string, password: string){
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCCosQZOAQkcBgqKdXJhDWGodsBN432Gf4',
        { 
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError(this.handleError),tap(resData => {
            this.handleAuthentication(
                resData.email, 
                resData.localId, 
                resData.idToken,
                +resData.expiresIn
            )
        }));
    }
    login(email: string, password: string){
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCCosQZOAQkcBgqKdXJhDWGodsBN432Gf4',{
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError(this.handleError),tap(resData => {
            this.handleAuthentication(
                resData.email, 
                resData.localId, 
                resData.idToken,
                +resData.expiresIn
            )
        }))
    }

    private handleAuthentication(email: string, userId:string, token:string, expiresIn: number){
        const expirationDate = new Date(new Date().getTime()+ expiresIn * 1000)
        const user = new User(
            email, 
            userId, 
            token, 
            expirationDate
        )
        this.user.next(user); 
    }
    private handleError(errorRes: HttpErrorResponse){
        let errorMessage = 'An unkown error occur';
            if(!errorRes.error || !errorRes.error.error){
                return throwError(errorMessage);
            }
            switch(errorRes.error.error.message){
                case 'EMAIL_EXIST':
                    errorMessage  = "This mail is laready exists";
                    break;
                case 'EMAIL_NOT_FOUND':
                    errorMessage = 'This Email is not found'
                    break;
                case 'INVALID_PASSWORD':
                    errorMessage = 'This passwoard is incorrect'
                    break;
            }
            return throwError(errorMessage)
    }
}