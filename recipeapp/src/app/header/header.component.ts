import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataStorageService } from '../Shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{

  isAuthentication = false;
  private UserSub!: Subscription;
  
  constructor(private dataStorageService: DataStorageService, private authService: AuthService) { }
  
  ngOnInit(): void {
    this.UserSub = this.authService.user.subscribe(user => {
      this.isAuthentication = !!user
    })
  }

  onSaveData(){
    this.dataStorageService.storeRecipes();
  }
  onfetchData(){
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onlogout(){
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.authService.user.unsubscribe()
  }
}
