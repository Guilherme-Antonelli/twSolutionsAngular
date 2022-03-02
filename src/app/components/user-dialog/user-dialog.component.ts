import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserUpdateInterface } from 'src/app/interfaces/user-update-interface';
import { UserAlertDialogComponent } from '../user-alert-dialog/user-alert-dialog.component';
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
    private userDialogService: UserDialogService,
    public dialog: MatDialog
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
    this.userDialogService.creatUser(this.userForm.value).subscribe(t => {this.dialogRef.close(); this.openDialog('Usuário criado')});
  }
  updateUser(){
    let copy = { ... this.userForm.value };
    delete copy.password;
    this.userDialogService.updateUser(this.data.id,copy).subscribe(res => {this.dialogRef.close(); this.openDialog('Usuário atualizado')});
  }
  deleteUser(){
    this.userDialogService.deleteUser(this.data.id).subscribe(() => {this.dialogRef.close(); this.openDialog('Usuário deletado')});
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  openDialog(data: string): void {
    const dialogRef = this.dialog.open(UserAlertDialogComponent, {
      width: '250px',
      data: data,
    });
    
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
