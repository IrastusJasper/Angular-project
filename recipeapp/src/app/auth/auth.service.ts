import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, tap } from "rxjs";
import { throwError } from "rxjs";
import { User } from "./user.model";
import { Router } from "@angular/router";

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
    user = new BehaviorSubject<User | null>(null);
    // userData: any;

    constructor(private http: HttpClient, private router: Router){} 
    private tokenExpirationTimer: any;
    
    autoLogin(){
        // const userData:{email: string; id: string; _token: string; _tokenExprirationDate: string;} 
        const userData : any 
        = (localStorage.getItem('userData'));
        if(!userData){
            return ;
        }
        const loadUser = new User(
            userData.email,
            userData.id,
            userData._token,
            new Date(userData._tokenExprirationDate)
        );
        if(loadUser.token){
            this.user.next(loadUser); 
            const expirationDuration = new Date(userData._tokenExprirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
        }
    }
    
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
    logout(){
        this.user.next(null)
        this.router.navigate(['/auth'])
        localStorage.removeItem('userData');
        if(this.tokenExpirationTimer){
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }
    autoLogout(expirationDuration: number){
        this.tokenExpirationTimer = setTimeout(()=>{
            this.logout();
        },expirationDuration)
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
        this.autoLogout(expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user))
    }
    private handleError(errorRes: HttpErrorResponse){
        let errorMessage = 'An unkown error occur';
            if(!errorRes.error || !errorRes.error.error){
                return throwError(errorMessage);
            }
            switch(errorRes.error.error.message){
                case 'EMAIL_EXIST':
                    errorMessage  = "This mail is already exists";
                    break;
                case 'EMAIL_NOT_FOUND':
                    errorMessage = 'This Email is not found'
                    break;
                case 'INVALID_PASSWORD':
                    errorMessage = 'This passward is incorrect'
                    break;
            }
            return throwError(errorMessage)
    }
}