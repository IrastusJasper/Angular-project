import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { string } from 'effect/FastCheck';
import { auto } from 'effect/Reloadable';
import TypeWrittingEffect from 'typewritter/dist/esm/components/App';

@Component({
  selector: 'app-hero',
  imports: [CommonModule],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {
  messages: string[] = [
    'Full Stack Developer',
    'React Js Developer',
    'Angular Developer',
    'Node js Developer',
  ];

  currentMessageIndex = 0;
  text = '';
  typingSpeed = 100;
  pauseBetweenMessages = 2000; // Delay before typing the next message
  charIndex = 0;

  ngOnInit(): void {
    this.startTyping();
  }

  startTyping(): void {
    const currentMessage = this.messages[this.currentMessageIndex];

    if (this.charIndex < currentMessage.length) {
      this.text += currentMessage.charAt(this.charIndex);
      this.charIndex++;
      setTimeout(() => this.startTyping(), this.typingSpeed);
    } else {
      setTimeout(() => this.startNextMessage(), this.pauseBetweenMessages);
    }
  }

  startNextMessage(): void {
    this.charIndex = 0;
    this.text = '';
    this.currentMessageIndex =
      (this.currentMessageIndex + 1) % this.messages.length;
    this.startTyping();
  }
}
