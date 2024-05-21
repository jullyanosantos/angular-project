import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { Task } from '../shared/task';
import { TaskService } from '../shared/task.service';

@Component({
  selector: 'app-task-list-item',
  standalone: true,  
  imports: [RouterLink, ButtonModule, CommonModule, FormsModule],
  providers: [],  
  templateUrl: './task-list-item.component.html',
  styleUrl: './task-list-item.component.css'
})
export class TaskListItemComponent implements OnInit {
  
  @Input()
  task: Task  = new Task();

  @Output()
  onDeleteTask = new EventEmitter()
  
  constructor(private taskService: TaskService) { }

  ngOnInit() {
  }

  remove(task: Task) {
    this.taskService.delete(task.id!).subscribe(() => {
      this.onDeleteTask.emit(task);
    });
  }

  onCompletedCheckChange(task: Task) {
    this.taskService.save(task).subscribe(task => {
      console.log(task);
    });
  }
}
