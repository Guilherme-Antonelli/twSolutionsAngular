import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from '../user-table/user-table.component';
import { UserDialogService } from './user-dialog.service';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})

export class UserDialogComponent implements OnInit {

  constructor(public fb: FormBuilder,
    public dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private userDialogService: UserDialogService
  ) {}

  exist = this.data.cpf == '';
  userForm = this.fb.group({
    name: ['', Validators.required],
    cpf: ['', Validators.required],
    email: ['', Validators.compose([Validators.required, Validators.email])],
    password: ['', Validators.required]
  })
  ngOnInit(): void {
      this.userForm.patchValue({
        name: this.data.name?this.data.name:'',
        cpf:  this.data.cpf?this.data.cpf:'',
        email: this.data.email?this.data.email:'',
      })
  }
  createUser(){
    this.userDialogService.creatUser(this.userForm.value).subscribe(t => this.dialogRef.close());
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
