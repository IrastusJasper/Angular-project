import { Component } from '@angular/core';
import { DataStorageService } from '../Shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private dataStorageService: DataStorageService) { }
  onSaveData(){
    this.dataStorageService.storeRecipes();
  }
  onfetchData(){
    this.dataStorageService.fetchRecipes().subscribe();
  }

  ngOnInit(): void {
  }
}
