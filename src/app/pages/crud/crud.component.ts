import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../../interfaces/user';
import { UsersService } from '../../services/users.service';
import { ModalFormUserComponent } from './modal-form-user/modal-form-user.component';
import { ModalViewUserComponent } from './modal-view-user/modal-view-user.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrl: './crud.component.scss'
})
export class CrudComponent {

  dataSource: any;
  displayedColumns : string[] = ['id', 'name','email','role','benefits','action'];
  listUsers: User[] =[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor( private service : UsersService,
                           private dialog : MatDialog){

    this.dataSource = new MatTableDataSource<any>(this.listUsers);
  }

  ngOnInit(){
    this.getListUsers();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getListUsers(){
    this.service.getAllUsers().subscribe({
      next: (response: any )=>{

        this.listUsers = response;

        this.dataSource = new MatTableDataSource<any>(this.listUsers);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.paginator._intl.itemsPerPageLabel="Usuários por página"

      },
      error: (erro) =>{
        console.log(erro);
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


 openModalViewUser( user: User){
  this.dialog.open(ModalViewUserComponent, {
    width: '750px',
    height: '350px',
    data: user
  })

 }

 openModalAddUser(){
  this.dialog.open(ModalFormUserComponent,{
    width:'800px',
    height:'450px',
  }).afterClosed().subscribe( () =>
     this.getListUsers());
 }

openModalEditUser( user : User){
  this.dialog.open(ModalFormUserComponent,{
    width:'800px',
    height:'450px',
    data: user
  }).afterClosed().subscribe( () =>
     this.getListUsers());
}

}
