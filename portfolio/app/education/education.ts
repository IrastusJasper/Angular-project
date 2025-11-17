import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import AOS from 'aos';
import 'aos/dist/aos.css';

@Component({
  selector: 'app-education',
  imports: [CommonModule],
  templateUrl: './education.html',
  styleUrl: './education.css',
})
export class Education {
  educationList = [
    {
      degree: 'Bachelor of Engineering in Computer Science',
      institution: 'PSNA College of Engineering and Technology',
      year: '2020 - 2024'
    },
    {
      degree: 'HSC',
      institution: 'Seventh Day Advention Matriculation Higher Seconday School',
      year: '2020',
    },
    {
      degree: 'SSLC',
      institution: 'Seventh Day Advention Matriculation Higher Seconday School',
      year: '2018',
    },
  ];

  ngOnInit() {
    AOS.init({ duration: 1000 });
  }
}
