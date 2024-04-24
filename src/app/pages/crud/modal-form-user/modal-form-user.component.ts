import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../../interfaces/user';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-modal-form-user',
  templateUrl: './modal-form-user.component.html',
  styleUrl: './modal-form-user.component.scss'
})
export class ModalFormUserComponent {

  planoSaude = [
    {
      id: 1,
      descricao: 'Plano 300 enfermaria'
    },
    {
      id: 2,
      descricao: 'Plano 400 enfermaria'
    },
    {
      id: 3,
      descricao: 'Plano 500 plus'
    },
  ];

  planoOndonto = [
    {
      id: 1,
      descricao: 'Plano Basico'
    },
    {
      id: 2,
      descricao: 'Plano Medio'
    },
    {
      id: 3,
      descricao: 'Plano Plus'
    }

  ];

  formUser : FormGroup;
  editUser: boolean = false;

  constructor( private formBuilder : FormBuilder,
                      private service: UsersService,
                      private toastr: ToastrService,
                      @Inject(MAT_DIALOG_DATA) public data: any,
                      public dialoRef: MatDialogRef<ModalFormUserComponent>){}

  ngOnInit(){
    this.buildForm();
    if( this.data && this.data.name){
      this.editUser = true;
    }
  }

  saveUser(){
    const userForm : User =  this.formUser.getRawValue();
//editar
    if( this.data && this.data.name){

      this.service.update(this.data.firebaseId, userForm).then(
        (response: any) =>{
          this.onSuccess(),
           this.closeModal();
        })
       .catch( erro =>{
         this.toastr.error('Ocorreu um erro ao salvar os dados!');
       });

    }else{
//cadastrar
      this.service.create(userForm).then(
        (response: any) =>{
          this.onSuccess(),
           this.closeModal();
        })
       .catch( erro =>{
          this.toastr.error('Ocorreu um erro ao salvar os dados!');
       });
    }

  }

  buildForm(){

    this.formUser = this.formBuilder.group({
        name: [null, [Validators.required, Validators.minLength(3)]],
        email: [null, [Validators.required, Validators.email]],
        sector: [null, [Validators.required, Validators.minLength(2)]],
        role: [null, [Validators.required, Validators.minLength(5)]],
        healthPlan: [''],
        dentalPlan: [''],
    });
    if (this.data && this.data.name){
      this.preencheForm();
    }
  }

  preencheForm(){
    this.formUser.patchValue({
      name: this.data.name,
      email: this.data.email,
      sector: this.data.sector,
      role: this.data.role,
      healthPlan: this.data.healthPlan,
      dentalPlan: this.data.dentalPlan,
    });
  }

  closeModal(){
    this.dialoRef.close();
  }

  onSuccess(){
    this.toastr.success("Dados Salvos com sucesso!")
    };


  }
