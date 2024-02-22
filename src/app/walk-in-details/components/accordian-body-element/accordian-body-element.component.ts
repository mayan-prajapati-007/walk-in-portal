import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'accordian-body-element',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accordian-body-element.component.html',
  styleUrl: './accordian-body-element.component.scss'
})
export class AccordianBodyElementComponent {
  @Input() title!: string;
  @Input() body!: string;

  ngOnInit() {
    this.body = this.formatBody(this.body);
  }

  formatBody(body: string) {
    let newBody = body.replaceAll('\\n\\n', '\n\n');
    newBody = newBody.replaceAll('\\n', '\n');
    return newBody;
  }
}
