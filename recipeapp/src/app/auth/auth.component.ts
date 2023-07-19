import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { Observable } from "rxjs";
import { AuthResponseData, AuthService } from "./auth.service";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AlertComponent } from "../Shared/alert/alert.component";
import { PlaceHolderDirective } from "../Shared/placeholder/placeholder.directive";

    
@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
})
export class AuthComponent implements OnInit, OnDestroy{
    closeSub: any;

    
    ngOnInit(){
    }
    isLoginMode = true;
    isLoading = false;
    error :string = '';    

    @ViewChild(PlaceHolderDirective, { static: false })
    alertHost!: PlaceHolderDirective;

    constructor(private authService: AuthService, private router: Router, private componentFactoryResolver: ComponentFactoryResolver){}
    
  
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
            this.router.navigate(['/recipe'])
        }, 
        (errorMessage: any)  =>{
            console.log(errorMessage);
            this.error = errorMessage;
            this.showErrorAlert(errorMessage)
            this.isLoading = false;
        }
        );
        authForm.reset()
    }
    onHandleError(){
        this.error = "";
    }

    ngOnDestroy(): void {
        if(this.closeSub){
            this.closeSub.unsubscribe();
        }
    }
    
    private showErrorAlert(message: string){
        // const alertcmp = new AlertComponent(); // this is valid code but not angular code
        const alertcmpfactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
        const hostViewContainerRef = this.alertHost.viewContainerRef;
        hostViewContainerRef.clear();

        const componentRef =hostViewContainerRef.createComponent(alertcmpfactory);

        componentRef.instance.message;
        this.closeSub = componentRef.instance.close.subscribe(() =>{
            this.closeSub.unsubscribe()
            hostViewContainerRef.clear();
        });
    }
}