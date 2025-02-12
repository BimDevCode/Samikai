import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RandomColorService {
  colors = ['var(--brown-color)', 'var(--green-color)', 'var(--blue-color)'];
  getRandomColor() {
    return this.colors[Math.floor(Math.random() * this.colors.length)];
  }
}
