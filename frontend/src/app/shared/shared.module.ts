import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Dialog } from './components/dialog/dialog';
import { ControlTable } from './components/control-table/control-table';
import { DinamicTable } from './components/dinamic-table/dinamic-table';
import { Page } from './components/page/page';
import { Header } from './components/header/header';
import { RouterModule } from '@angular/router';
import { Toast } from './components/toast/toast';

@NgModule({
  declarations: [
    Dialog,
    ControlTable,
    DinamicTable,
    Header,
    Page,
    Toast,
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    Dialog,
    ControlTable,
    DinamicTable,
    Header,
    Page,
    CommonModule,
    RouterModule,
    Toast
  ]
})
export class SharedModule { }
