import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { TelstraServiceService } from '../../../services/telstra-service.service'
import {MatSnackBar} from '@angular/material/snack-bar';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

// const ELEMENT_DATA: PeriodicElement[] = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
// ];

export interface unReceipt {
  transactionId: string;
  consignmentId: string;
  articleId: number;
  RLODate: string;
  priority: number;
  inventoryBucket: string;
  lineNumber: number;
  quantity: string;
  telstraItemId: string;
  status: number;
  createdTime: string;
}


@Component({
  selector: 'app-gbp-telstra-dashboard',
  templateUrl: './gbp-telstra-dashboard.component.html',
  styleUrls: ['./gbp-telstra-dashboard.component.scss']
})
export class GbpTelstraDashboardComponent implements OnInit,AfterViewInit  {
  ngOnInit(): void {
    this.getReceipt();
  }

  displayedColumns: string[] = ['select','transactionId', 'consignmentId', 'articleId', 'RLODate','priority','inventoryBucket','lineNumber','quantity','telstraItemId','status','createdTime'];
  dataSource :MatTableDataSource<unReceipt[]>;
  initialSelection = [];
  allowMultiSelect = true;
  default_check=true;
 selection = new SelectionModel<any>(this.allowMultiSelect, this.initialSelection);

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  // @ViewChild('table',{static: true}) table: MatTable<Element>;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  Defaultselect(){
    this.dataSource.data.forEach(row => {
      console.log('row selected:'+row)
      this.selection.select(row)
    });
  }

  constructor(private _telstr: TelstraServiceService, private _snackBar: MatSnackBar){}

  /** Whether the number of selected elements matches the total number of rows. */
isAllSelected() {
  const numSelected = this.selection.selected.length;
  const numRows = this.dataSource.data.length;
  return numSelected == numRows;
}

/** Selects all rows if they are not all selected; otherwise clear selection. */
masterToggle() {
  this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => {
        console.log('row selected:'+row)
        this.selection.select(row)
      });
}

getReceipt(){
  this._telstr.getReceiptdata().subscribe(res=>{
    console.log("Bala resposne: "+JSON.stringify(res['EParcelAPI']))
    this.dataSource = new MatTableDataSource(JSON.parse(JSON.stringify(res['EParcelAPI'])));
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.Defaultselect();
  })
}

openSnackBar() {
  this._snackBar.open('Message Successfully submitted!!!', null, {
    duration: 2000,
    panelClass: ['snackbarcss']
  });
}

Noselectedrow() {
  this._snackBar.open('Please select rows!!!', null, {
    duration: 2000000,
    panelClass: ['snackbarcsserror']
  });
}

public doFilter = (value: string) => {
  this.dataSource.filter = value.trim().toLocaleLowerCase();
}

onSubmit(){
  console.log('On Submit Triggered');
  let jsondata = '{"updateEParcel":[]}'
  let obj = JSON.parse(jsondata);
  this.selection.selected.length == 0 ? this.Noselectedrow() : null;
  this.selection.selected.forEach(s => {
      console.log(s['consignmentId'])
      const consignment = s['consignmentId'];
      const articleID = s['articleId'];
      const status = 'SPMTRECEIVED';

      const tempData = {
        "consignmentId": consignment,
        "articleId": articleID,
        "status": status
      }

      obj["updateEParcel"].push(tempData)
      //console.log('JSON da '+ JSON.stringify(obj))

    //   console.log('Data source length Before: '+ this.dataSource.data.length)

    // console.log('Consignment ID :'+consignment+'; Article ID: '+articleID+'; Status: '+status)
    const index = this.dataSource.data.indexOf(articleID);

    this.dataSource.data.splice(index, 1);
    //console.log('before update: '+JSON.stringify(this.dataSource.data))
    // this.dataSource = new MatTableDataSource(JSON.parse(JSON.stringify(this.dataSource.data)));

    this.dataSource._updateChangeSubscription;
    this.dataSource._renderChangesSubscription; // <-- Refresh the datasource

    // console.log(typeof(this.dataSource))
    // console.log('Data source length after: '+ this.dataSource.data.length)
    // this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;
  });

  console.log('Out side value json : '+JSON.stringify(obj));

  if(this.selection.selected.length != 0){
    this._telstr.postReceiptData(obj).subscribe(res=>{
      console.log('Post Message result: '+res);
      this.openSnackBar();
      this.getReceipt();
      this.selection.clear();
    })
  }

}

}
