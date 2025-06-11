import { Component } from '@angular/core';
import AOS from 'aos';


@Component({
  selector: 'app-about-me',
  imports: [],
  templateUrl: './about-me.html',
  styleUrl: './about-me.css'
})
export class AboutMe {

  ngOnInit(){
    AOS.init({ duration: 1000 });
  }

  aboutMe: string = "I'm Irastus Jasper. I'm highly adaptable and results-driven professional with expertise in both general and technical skills. Possesses a strong understanding of current technologies and a proven ability to collaborate effectively with teams. Adept at leveraging emerging technologies to drive innovation and improve processes. Passionate about continuous learning and staying up-to-date with industry trends and best practices to deliver exceptional digital experiences and impactful solutions."
}
