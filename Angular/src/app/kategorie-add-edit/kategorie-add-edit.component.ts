import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoreService } from '../core/services/core.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { KategorieService } from '../services/kategorie.service';

@Component({
  selector: 'app-kategorie-add-edit',
  templateUrl: './kategorie-add-edit.component.html',
  styleUrls: ['./kategorie-add-edit.component.css']
})
export class KategorieAddEditComponent implements OnInit {
  kategorieForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _kategorieService: KategorieService,
    private _dialogRef: MatDialogRef<KategorieAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService : CoreService
  ){
    this.kategorieForm = this._fb.group({
      nazwa: '',
      adres_sklepu: '',
      czy_mozliwa_rezerwacja: '',
    })
  }

  ngOnInit(): void {
    this.kategorieForm.patchValue(this.data);
  }

  onFormSubmit(){
    if(this.kategorieForm.valid){
      if(this.data){
        this._kategorieService.updateKategoria(this.data.id,this.kategorieForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Zaaktualizowano pomyślnie')
            this._dialogRef.close(true);
          },
          error: (err: any) =>{
            this._coreService.openSnackBar('Wprowadzono nieprawidłowe dane')
          }
        });
      }else{
        this._kategorieService.addKategoria(this.kategorieForm.value).subscribe({
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
} {

}
