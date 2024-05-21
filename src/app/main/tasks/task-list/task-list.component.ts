import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

import { Task } from '../shared/task';
import { TaskService } from '../shared/task.service';
import { TaskListItemComponent } from '../task-list-item/task-list-item.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [TaskListItemComponent, RouterLink, CommonModule, FormsModule, ButtonModule, TooltipModule],
  providers: [],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {
  tasks: Task[] = [
    { id: '1', description: "Juliano task 1", completed: false },
    { id: '2', description: "Juliano task 2", completed: false },
    { id: '3', description: "Juliano task 3", completed: false },
  ];

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    // this.taskService.getAll().subscribe(tasks => { 
    //   this.tasks = tasks;
    // });
  }

  onTaskDeleted(task: Task) {
    if (task) {
      const index = this.tasks.findIndex((taskItem) => taskItem.id == task.id);
      this.tasks.splice(index, 1);
    }
  }
}