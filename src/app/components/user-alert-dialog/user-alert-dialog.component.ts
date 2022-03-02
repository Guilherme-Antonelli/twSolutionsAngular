import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from '../user-table/user-table.component';

@Component({
  selector: 'app-user-alert-dialog',
  templateUrl: './user-alert-dialog.component.html',
  styleUrls: ['./user-alert-dialog.component.scss']
})
export class UserAlertDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: string) { }

  mensagem: string;
  ngOnInit(): void {
    this.mensagem = this.data;
  }

}
