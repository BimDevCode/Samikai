import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-text-paragraph',
  templateUrl: './text-paragraph.component.html',
  styleUrl: './text-paragraph.component.scss'
})
export class TextParagraphComponent implements OnInit{
  @Input() text: string = 
  `Consequat sint exercitation sit id excepteur. Nisi enim proident aliqua proident esse cillum voluptate. Incididunt id fugiat deserunt nulla pariatur aliqua et veniam eu dolor amet irure Lorem. Adipisicing Lorem tempor quis non velit dolore est irure officia mollit est elit elit. Veniam minim ex dolore non quis velit Lorem esse. Ea mollit quis Lorem sit eu aute non nostrud exercitation nulla mollit esse dolore.`;
    
  constructor(
    ) {
    }
  ngOnInit(): void {
  }
}