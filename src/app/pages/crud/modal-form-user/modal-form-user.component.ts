import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
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
    }
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

  constructor( private formBuilder : FormBuilder,
                           private service: UsersService,
                           public dialoRef: MatDialogRef<ModalFormUserComponent>){}

  ngOnInit(){
    this.buildForm();
  }

  saveUser(){
    const userForm : User =  this.formUser.getRawValue();
    this.service.create(userForm).then(
      (response: any) =>{
        window.alert('Salvo com sucesso!');
        this.closeModal();
      })
     .catch( erro =>{
      window.alert('Ocorreu um erro ao cadastrar o usuário.');
      console.error(erro);
     });
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
  }


  closeModal(){
    this.dialoRef.close();
  }
}
