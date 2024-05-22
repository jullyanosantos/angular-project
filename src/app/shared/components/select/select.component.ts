import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task } from '../../../main/tasks/shared/task';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.css'
})
export class SelectComponent {
  selectedItem = 0;
  selectedItems = [];

  @Input() labelKey = 'label';
  @Input() idKey = 'id';
  @Input() options: Task[]= [];  
  @Input() model: any;
  @Output() selectChange: EventEmitter<string> = new EventEmitter<string>();
  originalOptions: Task[] = [];

  ngOnInit() {

    this.originalOptions = [...this.options];

    if (this.model !== undefined) {

    }

  }

  onChange(e: any) {

    debugger

    this.selectChange.emit(e.target.value);
  }

  get label() {
    return this.model ? this.model[this.labelKey] : 'Select...';
  }

}
