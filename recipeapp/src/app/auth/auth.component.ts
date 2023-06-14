import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { AuthResponseData, AuthService } from "./auth.service";
import { NgForm } from "@angular/forms";

    
@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
})
export class AuthComponent implements OnInit{

    
    ngOnInit(){
    }
    constructor(private authService: AuthService ){}
    
    isLoginMode = true;
    isLoading = false;
    error :string = '';    

    onSwitchMode(){
        this.isLoginMode = !this.isLoginMode;
    }
    
    onSubmit(authForm: NgForm){
        console.log(authForm.valid)
        
        if(!authForm.valid){
            return; 
        }
        const email = authForm.value.email;
        const password = authForm.value.password;

        let authObs: Observable<AuthResponseData>;
        this.isLoading = true;

        if(this.isLoginMode){
            authObs = this.authService.login(email, password);
        }else{
            authObs = this.authService.signUp(email, password)
        }
        // this.isLoading = false;
        authObs.subscribe(
            (resData:any) =>{
            console.log(resData);
            this.isLoading = false; 
        }, 
        (errorMessage: any)  =>{
            console.log(errorMessage);
            this.error = errorMessage;
            this.isLoading = false;
        }
        );
        authForm.reset()
    }
    
}