import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProduktyService } from '../services/produkty.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/services/core.service';

@Component({
  selector: 'app-produkty-add-edit',
  templateUrl: './produkty-add-edit.component.html',
  styleUrls: ['./produkty-add-edit.component.css']
})
export class ProduktyAddEditComponent implements OnInit {
  produktyForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _produktyService: ProduktyService,
    private _dialogRef: MatDialogRef<ProduktyAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService : CoreService
  ){
    this.produktyForm = this._fb.group({
      kategoria_id: '',
      nazwa: '',
      opis: '',
      cena: '',
      zdjecie: ''
    })
  }

  ngOnInit(): void {
    this.produktyForm.patchValue(this.data);
  }

  onFormSubmit(){
    if(this.produktyForm.valid){
      if(this.data){
        this._produktyService.updateProdukt(this.data.id,this.produktyForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Zaaktualizowano pomyślnie')
            this._dialogRef.close(true);
          },
          error: (err: any) =>{
            this._coreService.openSnackBar('Wprowadzono nieprawidłowe dane')
          }
        });
      }else{
        this._produktyService.addProdukt(this.produktyForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Dodano pomyślnie')
            this._dialogRef.close(true);
          },
          error: (err: any) =>{
            this._coreService.openSnackBar('Wprowadzono nieprawidłowe dane')
          }
        });
      }
    }
  }
}
