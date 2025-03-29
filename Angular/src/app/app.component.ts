import { ChangeDetectorRef, Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CoreService } from './core/services/core.service';
import { ProduktyService } from './services/produkty.service';
import { ProduktyAddEditComponent } from './produkty-add-edit/produkty-add-edit.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BottomPanelComponent } from './bottom-panel/bottom-panel.component';
import { KategorieService } from './services/kategorie.service';
import { Kategorie } from './kategorie';
import { Produkty } from './produkty';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  temp: string | undefined;
  tableView = true; 
  produktyList: any[] = [];
  filteredProduktyList: any[] = [];
  produkty: Produkty[] = [];

  title(title: any) {
    throw new Error('Method not implemented.');
  }

  displayedColumns: string[] = ['id', 'kategoria', 'nazwa', 'opis','cena','action'];
  dataSource!: MatTableDataSource<any>;
  kategoriaMap: { [key: number]: string } = {};

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // switchValue = 'material';
  constructor(private _dialog: MatDialog,
    private _produktyService: ProduktyService,
    private _coreService: CoreService,
    private bottomSheet: MatBottomSheet,
    private _kategorieService: KategorieService,
    private cdr: ChangeDetectorRef,
    private zone: NgZone){}

  ngOnInit(): void {
    this.getProduktyList();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openAddEditProduktyForm(){
    const dialogRef = this._dialog.open(ProduktyAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) =>{
        if(val){
          this.getProduktyList();
        }
      }
    })
  }


  
  // getProduktyList() {
  //   this._produktyService.getProduktyList().subscribe({
  //     next: (produkty) => {
  //       const kategoriId = produkty.map(produkt => produkt.kategoria_id);
  
  //       this._kategorieService.getKategoriaById(kategoriId).subscribe({
  //         next: (kategorie: Kategorie | Kategorie[]) => {
  //           const kategoriMap: { [key: number]: string } = Array.isArray(kategorie)
  //             ? kategorie.reduce((map, kategoria) => {
  //                 map[kategoria.id] = kategoria.nazwa;
  //                 return map;
  //               }, {} as { [key: number]: string })
  //             : { [kategorie.id]: kategorie.nazwa };
  
  //           const produktyZKategorie = produkty.map(produkt => ({
  //             ...produkt,
  //             kategoria_nazwa: kategoriMap[produkt.kategoria_id] || 'Brak kategorii'
  //           }));
  
  //           this.dataSource = new MatTableDataSource(produktyZKategorie);
  //           this.dataSource.sort = this.sort;
  //           this.dataSource.paginator = this.paginator;
  
  //           this.produktyList = produktyZKategorie;
  //         },
  //         error: console.log
  //       });
  //     },
  //     error: console.log
  //   });
  // }

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();

  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }

  getProduktyList() {
    this._produktyService.getProduktyList().subscribe({
      next: (produkty) => {
        const kategoriId = produkty.map(produkt => produkt.kategoria_id);
  
        this._kategorieService.getKategoriaById(kategoriId).subscribe({
          next: (kategorie: Kategorie | Kategorie[]) => {
            const kategoriMap: { [key: number]: string } = Array.isArray(kategorie)
              ? kategorie.reduce((map, kategoria) => {
                  map[kategoria.id] = kategoria.nazwa;
                  return map;
                }, {} as { [key: number]: string })
              : { [kategorie.id]: kategorie.nazwa };
  
            const produktyZKategorie = produkty.map(produkt => ({
              ...produkt,
              kategoria_nazwa: kategoriMap[produkt.kategoria_id] || 'Brak kategorii'
            }));
  
            this.dataSource = new MatTableDataSource(produktyZKategorie);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
  
            this.produktyList = produktyZKategorie;
            this.filteredProduktyList = [...this.produktyList];
          },
          error: console.log
        });
      },
      error: console.log
    });
  }

  deleteProdukt(id: number){
    this._produktyService.deleteProdukt(id).subscribe({
      next: (res) =>{
        this._coreService.openSnackBar('Pomyslnie usunięto','gotowe')
        this.getProduktyList();
      },
      error: console.log
    })
  }

  openEditForm(data: any){
    const dialogRef = this._dialog.open(ProduktyAddEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) =>{
        if(val){
          this.getProduktyList();
        }
      }
    })
  }

  UseSnackBar(dane: string){
    if(this.temp != dane){
      this._coreService.openSnackBar('Brak rekordów dla filtru: '+dane);
      this.temp = dane;
    }
  }

  openBottomSheet(): void {
    this.bottomSheet.open(BottomPanelComponent);
  }
  
  toggleView() {
    this.tableView = !this.tableView;
    this.getProduktyList();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
  
    
    this.dataSource.filter = filterValue;
  
    
    const filteredList = this.produktyList.filter(produkt =>
      produkt.nazwa.toLowerCase().includes(filterValue) ||
      produkt.kategoria_nazwa.toLowerCase().includes(filterValue) ||
      produkt.opis.toLowerCase().includes(filterValue) ||
      produkt.cena.toString().toLowerCase().includes(filterValue)
    );
    
    this.zone.run(() => {
      this.filteredProduktyList = [...filteredList]; 
    });
  }
}


