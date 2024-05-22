import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { Task } from '../shared/task';
import { TaskService } from '../shared/task.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [RouterLink,  FormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent implements OnInit {
  task: Task = new Task();
  title: string = '_nova tarefa';
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private taskService: TaskService
  ) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.taskService.getById(id).subscribe(task => {
        this.task = task;
        this.title = 'Alterando tarefa';
      });
    }
  }

  onSubmit() {
    this.taskService.save(this.task).subscribe(task => {
      console.log(task);
      this.router.navigate(['']);
    });
  }
}