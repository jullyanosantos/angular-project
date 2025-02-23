import { CommonModule } from '@angular/common';
import { Component, Injector, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

import { ButtonBusyDirective } from '../../shared/_directives/button-busy.directive';
import { SpinnerButtonDirective } from '../../shared/_directives/spinner-button-directive';
import { AppComponentBase } from '../../shared/app-component-base';
import { SelectComponent } from '../../shared/components/select/select.component';
import { Task } from '../tasks/shared/task';
import { BusyIfDirective } from '../../shared/_directives/busy-if.directive';
import { TranslateModule } from '@ngx-translate/core';
import { RippleModule } from 'primeng/ripple';

declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}
@Component({
  selector: 'app-home',
  standalone: true,
  imports:
    [
      TranslateModule,
      ButtonModule,
      FormsModule,
      CommonModule,
      SelectComponent,
      ButtonBusyDirective,
      SpinnerButtonDirective,
      BusyIfDirective,
      RippleModule,
      
    ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent extends AppComponentBase implements OnInit {
  loading = true;
  public tableData1: TableData | undefined;

  public tasks: Task[] = [
    { id: '1', description: "Juliano task 1", completed: false },
    { id: '2', description: "Juliano task 2", completed: false },
    { id: '3', description: "Juliano task 3", completed: false },
  ];
  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() {

    this.tableData1 = {
      headerRow: ['ID', 'Name', 'Country', 'City', 'Salary'],
      dataRows: [
        ['1', 'Dakota Rice', 'Niger', 'Oud-Turnhout', '$36,738'],
        ['2', 'Minerva Hooper', 'Curaçao', 'Sinaai-Waas', '$23,789'],
        ['3', 'Sage Rodriguez', 'Netherlands', 'Baileux', '$56,142'],
        ['4', 'Philip Chaney', 'Korea, South', 'Overland Park', '$38,735'],
        ['5', 'Doris Greene', 'Malawi', 'Feldkirchen in Kärnten', '$63,542'],
        ['6', 'Mason Porter', 'Chile', 'Gloucester', '$78,615']
      ]
    };

    this.getData();
  }

  getData() {

    this.loading = true;

    setTimeout(() => {
      this.loading = false
    }, 4000);
  }

  onChange(id: string) {
    debugger
    alert('Vc selecionou o item ' + id);
  }
}
