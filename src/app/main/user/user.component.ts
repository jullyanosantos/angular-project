import { CommonModule } from '@angular/common';
import { Component, Injector, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

import { AppComponentBase } from '../../shared/app-component-base';

declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [ButtonModule, FormsModule, CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent extends AppComponentBase implements OnInit {
  public tableData1: TableData | undefined;
  public tableData2: TableData | undefined;

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    this.sweetAlertService.success("Usuários carregados com sucesso!");
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
    this.tableData2 = {
      headerRow: ['ID', 'Name', 'Salary', 'Country', 'City'],
      dataRows: [
        ['1', 'Dakota Rice', '$36,738', 'Niger', 'Oud-Turnhout'],
        ['2', 'Minerva Hooper', '$23,789', 'Curaçao', 'Sinaai-Waas'],
        ['3', 'Sage Rodriguez', '$56,142', 'Netherlands', 'Baileux'],
        ['4', 'Philip Chaney', '$38,735', 'Korea, South', 'Overland Park'],
        ['5', 'Doris Greene', '$63,542', 'Malawi', 'Feldkirchen in Kärnten',],
        ['6', 'Mason Porter', '$78,615', 'Chile', 'Gloucester']
      ]
    };
  }
}
