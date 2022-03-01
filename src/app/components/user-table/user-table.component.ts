import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { merge } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';
import { UserTableDataSource, UserTableItem } from './user-table-datasource';
import { UserTableService } from './user-table.service';

export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})


export class UserTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatTable, {static: false}) table: MatTable<UserTableItem>;
  dataSource: UserTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'cpf', 'email'];
  public inputName = new FormControl('', [Validators.minLength(3)]);
  
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;


  constructor(private readonly userTableService: UserTableService, public dialog: MatDialog){}

  async ngOnInit() {
    this.dataSource = new UserTableDataSource();    
  }
  
  openDialog(): void {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '250px',
      data: {},
    });
    
    dialogRef.afterClosed().subscribe(result => {
      this.attList();
      console.log('The dialog was closed');
    });
  }
  
  ngAfterViewInit() {
    
    // this.table.dataSource = this.dataSource;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.inputName.valueChanges.subscribe(t => this.attList())
    this.sort.sortChange.subscribe(() => (this.dataSource.paginator.pageIndex = 0));
    this.sort.direction = 'asc';
    this.attList();
   
  }
  
  attList(){
    merge(this.sort.sortChange, this.paginator.page)
    .pipe(
      startWith({}),
      switchMap(() => {
        this.isLoadingResults = true;
        return this.userTableService!.getUsers(
          this.dataSource.paginator.pageIndex * this.dataSource.paginator.pageSize,
          this.dataSource.paginator.pageSize,
          this.sort.direction == 'asc' ? 1 : -1,
          this.inputName.value
          ).pipe(catchError(() => observableOf(null)));
        }),
        map((data: any) => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = data === null;
          
          console.log('0',this.inputName.value)
        if (data === null) {
          return [];
        }

        // Only refresh the result length if there is new data. In case of rate
        // limit errors, we do not want to reset the paginator to zero, as that
        // would prevent users from re-triggering requests.
        this.table.dataSource = this.dataSource.data
        this.resultsLength = data.count;
        return data.list;
      }),
    )
    .subscribe(data => {
      this.dataSource.data = data;
      this.table.dataSource = this.dataSource; 
    });
  }
}

function observableOf(arg0: null): any {
  throw new Error('Function not implemented.');
}




