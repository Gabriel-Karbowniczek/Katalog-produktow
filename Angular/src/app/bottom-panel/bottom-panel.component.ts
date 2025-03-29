import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { KategorieService } from '../services/kategorie.service';
import { CoreService } from '../core/services/core.service';
import { MatTableDataSource } from '@angular/material/table';
import { KategorieAddEditComponent } from '../kategorie-add-edit/kategorie-add-edit.component';

@Component({
  selector: 'app-bottom-panel',
  templateUrl: './bottom-panel.component.html',
  styleUrls: ['./bottom-panel.component.css']
})
export class BottomPanelComponent implements OnInit {
  
  displayedColumns: string[] = ['id','nazwa', 'adres_sklepu','czy_mozliwa_rezerwacja','akcje'];
  dataSource!: MatTableDataSource<any>;

  constructor(private bottomSheetRef: MatBottomSheetRef<BottomPanelComponent>,
    private _dialog: MatDialog,
    private _kategorieService: KategorieService,
    private _coreService: CoreService) {}

  ngOnInit(): void {
    this.getKategorieList();
  }

  closePanel(): void {
    this.bottomSheetRef.dismiss(); 
    window.location.reload();
  }

  openAddEditKategorieForm(){
    const dialogRef = this._dialog.open(KategorieAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) =>{
        if(val){
          this.getKategorieList();
        }
      }
    })
  }

  getKategorieList(){
    this._kategorieService.getKategorieList().subscribe({
      next: (res) =>{
        console.log('Otrzymane dane:', res);
        this.dataSource = new MatTableDataSource(res);
      },
      error: console.log
    })
  }

  deleteKategoria(id: number){
    this._kategorieService.deleteKategoria(id).subscribe({
      next: (res) =>{
        this._coreService.openSnackBar('Pomyslnie usunięto','gotowe')
        this.getKategorieList();
      },
      error: console.log
    })
  }

  openEditForm(data: any){
    const dialogRef = this._dialog.open(KategorieAddEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) =>{
        if(val){
          this.getKategorieList();
        }
      }
    })
  }

}
