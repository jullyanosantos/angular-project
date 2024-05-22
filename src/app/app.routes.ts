import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'
import { HomeComponent } from './main/home/home.component';
import { UserComponent } from './main/user/user.component';
import { PageNotFoundComponent } from './main/page-not-found/page-not-found.component';
import { TaskListComponent } from './main/tasks/task-list/task-list.component';
import { TaskFormComponent } from './main/tasks/task-form/task-form.component';

export const routes: Routes = [
    { path: '', title: 'Home', component: HomeComponent },
    { path: 'user', title: 'User', component: UserComponent },
    
    { path: 'tasks', component: TaskListComponent },
    { path: 'new', component: TaskFormComponent },
    
    { path: '**', component: PageNotFoundComponent } 
];
