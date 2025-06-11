import { Component } from '@angular/core';
import * as AOS from 'aos';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  currentYear: number = new Date().getFullYear();

  ngOnInit(): void {
    AOS.init({ duration: 1000 });
  }
}
