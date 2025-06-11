import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import AOS from 'aos';

@Component({
  selector: 'app-skills',
  imports: [CommonModule],
  templateUrl: './skills.html',
  styleUrl: './skills.css',
})
export class Skills {
  ngOnInit() {
    AOS.init({ duration: 1000 });
  }

  selectedTab: string = 'mean';

  meanSkills = [
    { name: 'MongoDB', level: 85, icon: '🍃' },
    { name: 'Express.js', level: 80, icon: '🚂' },
    { name: 'Angular', level: 90, icon: '🅰️' },
    { name: 'Node.js', level: 85, icon: '🖥️' },
    { name: 'TypeScript', level: 75, icon: '📘' },
    { name: 'REST APIs', level: 80, icon: '🔗' },
    // { name: 'JWT/Auth', level: 75, icon: '🔐' },
    { name: 'MongoDB Atlas', level: 70, icon: '☁️' },
  ];

  mernSkills = [
    { name: 'MongoDB', level: 85, icon: '🍃' },
    { name: 'Express.js', level: 80, icon: '🚂' },
    { name: 'React.js', level: 90, icon: '⚛️' },
    { name: 'Node.js', level: 85, icon: '🖥️' },
    { name: 'JavaScript (ES6+)', level: 90, icon: '🧠' },
    { name: 'Redux / Context API', level: 75, icon: '🧰' },
    { name: 'REST APIs', level: 80, icon: '🔗' },
    { name: 'React Hooks', level: 80, icon: '🎣' },
  ];

  otherSkills = [
    { name: 'MySQL', level: 75, icon: '🗄️' },
    { name: 'UX Design', level: 80, icon: '🎨' },
    { name: 'Bootstrap', level: 85, icon: '🅱️' },
    { name: 'Git & GitHub', level: 85, icon: '🐙' },
    { name: 'Postman', level: 80, icon: '📬' },
  ];
}
