import { CommonModule } from '@angular/common';
import { Component, ElementRef, Injector, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { first } from 'rxjs';

import { BusyIfDirective } from '../../shared/_directives/busy-if.directive';
import { ButtonBusyDirective } from '../../shared/_directives/button-busy.directive';
import { SpinnerButtonDirective } from '../../shared/_directives/spinner-button-directive';
import { UserService } from '../../shared/_services/user.service';
import { AppComponentBase } from '../../shared/app-component-base';
import { ModalComponent } from '../modal/modal.component';

declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}

@Component({
  selector: 'app-user',
  standalone: true,
  imports:
    [
      ButtonModule,
      FormsModule,
      CommonModule,
      ButtonBusyDirective,
      SpinnerButtonDirective,
      BusyIfDirective,
      ModalComponent
    ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent extends AppComponentBase implements OnInit {
  public tableData1: TableData | undefined;
  public tableData2: TableData | undefined;

  public lotes: TableData | undefined;
  public ranking: TableData = {
    headerRow: ['ID', 'Descrição'],
    dataRows: []
  };
  users: any = [];
  loading = false;
  loadingRanking = true;

  @ViewChild('myModal') myModal!: ModalComponent;

  @ViewChild('dialog') dialog!: ElementRef<HTMLDialogElement>;

  constructor(injector: Injector,
    private userService: UserService,
  ) {
    super(injector);
  }


  opem() {

    debugger
    this.myModal.opemModal();
  }

  // openModal() {
  //   this.dialog.nativeElement.showModal();
  //   this.dialog.nativeElement.classList.add('opened');
  // }

  reloadUser() {
    this.getUsers();
  }

  ngOnInit() {

    this.reloadUser();
    // this.getLotes();
    // this.getRanking();

    // this.tableData1 = {
    //   headerRow: ['ID', 'Name', 'Country', 'City', 'Salary'],
    //   dataRows: [
    //     ['1', 'Dakota Rice', 'Niger', 'Oud-Turnhout', '$36,738'],
    //     ['2', 'Minerva Hooper', 'Curaçao', 'Sinaai-Waas', '$23,789'],
    //     ['3', 'Sage Rodriguez', 'Netherlands', 'Baileux', '$56,142'],
    //     ['4', 'Philip Chaney', 'Korea, South', 'Overland Park', '$38,735'],
    //     ['5', 'Doris Greene', 'Malawi', 'Feldkirchen in Kärnten', '$63,542'],
    //     ['6', 'Mason Porter', 'Chile', 'Gloucester', '$78,615']
    //   ]
    // };
    // this.tableData2 = {
    //   headerRow: ['ID', 'Name', 'Salary', 'Country', 'City'],
    //   dataRows: [
    //     ['1', 'Dakota Rice', '$36,738', 'Niger', 'Oud-Turnhout'],
    //     ['2', 'Minerva Hooper', '$23,789', 'Curaçao', 'Sinaai-Waas'],
    //     ['3', 'Sage Rodriguez', '$56,142', 'Netherlands', 'Baileux'],
    //     ['4', 'Philip Chaney', '$38,735', 'Korea, South', 'Overland Park'],
    //     ['5', 'Doris Greene', '$63,542', 'Malawi', 'Feldkirchen in Kärnten',],
    //     ['6', 'Mason Porter', '$78,615', 'Chile', 'Gloucester']
    //   ]
    // };
  }

  getUsers(): void {
    this.loading = true;

    this.userService.getAll()
      .subscribe({
        next: (resp) => {
          this.users = resp.data.list;
          // this.alertService.success("Loaded with success!", { autoClose: true });
          // this.toatrService.info("Test msg toastr");
          // this.sweetAlertService.success("Usuários carregados com sucesso!");
        },
        error: (err) => {
          // this.toatrService.error("Error getting users");
          this.alertService.error("Error getting users");
          this.loading = false;
        },
        complete: () => {
          setTimeout(() => {
            this.loading = false
          }, 2000);
        }
      });
  }

  getRanking(): void {
    this.loading = true;
    this.userService.getRanking()
      .subscribe({
        next: (data) => {
          if (data.length > 0) {

            let rows: string[][] = [];

            data.forEach((item: any) => {
              item.rankings.forEach((r: any) => {
                rows.push([r.sinCodRanking, r.descRanking])
              })
            });

            this.ranking = {
              headerRow: ['ID', 'Descrição'],
              dataRows: rows
            };
          }
        },
        error: (error) => {
          this.toatrService.error(error);
        },
        complete: () => {
          setTimeout(() => {
            this.loading = false
          }, 5000);
        }
      });
  }

  getLotes() {

    this.userService.getLotes()
      .pipe(first())
      .subscribe(data => {

        if (data.length > 0) {

          let rows: string[][] = [];

          data.forEach((item: any) => {
            item.lotes.forEach((lote: any) => {
              rows.push([lote.idLote, lote.descLote])
            })
          });

          this.lotes = {
            headerRow: ['ID', 'Descrição'],
            dataRows: rows
          };

        }
        this.loading = false;

        // this.sweetAlertService.success("Lotes carregados com sucesso! Total: " + aa.length);
      }, error => {
        this.toatrService.error(error);
      });
  }
}
