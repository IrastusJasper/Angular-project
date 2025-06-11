import { Component } from '@angular/core';
import { Header } from './header/header';
import { Hero } from './hero/hero';
import { AboutMe } from "./about-me/about-me";
import { Skills } from "./skills/skills";
import { Education } from "./education/education";
import { Contact } from "./contact/contact";
import { Footer } from "./footer/footer";

@Component({
  selector: 'app-root',
  imports: [Header, Hero, AboutMe, Skills, Education, Contact, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'portfolio';
}
