import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

import * as XLSX from 'xlsx';
interface YourDataType {
  name: string;
  position: string;
  office: string;
  age: number;
}
const YOUR_DATA: YourDataType[] = [
  { name: 'John Doe', position: 'Developer', office: 'TechCo', age: 30 },
  { name: 'Jane Smith', position: 'Designer', office: 'CreativeDesign', age: 25 },
  { name: 'John Doe', position: 'Developer', office: 'TechCo', age: 30 },
  { name: 'John Doe', position: 'Developer', office: 'TechCo', age: 30 },
  { name: 'John Doe', position: 'Developer', office: 'TechCo', age: 30 },
  { name: 'John Doe', position: 'Developer', office: 'TechCo', age: 30 },
  { name: 'Jane Smith', position: 'Designer', office: 'CreativeDesign', age: 25 },
  { name: 'John Doe', position: 'Developer', office: 'TechCo', age: 30 },
  { name: 'John Doe', position: 'Developer', office: 'TechCo', age: 30 },
  { name: 'John Doe', position: 'Developer', office: 'TechCo', age: 30 },
  // Add more data as needed
];
@Component({
  selector: 'app-database',
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.scss'],

})
export class DatabaseComponent implements AfterViewInit {
  displayedColumns: string[] = ['name', 'position', 'office', 'age'];
  // Replace this with your actual data

  dataSource = new MatTableDataSource<YourDataType>(YOUR_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  exportToExcel(): void {
    const data: any[] = this.dataSource.filteredData.map(item => ({
      name: item.name,
      position: item.position,
      office: item.office,
      age: item.age,
    }));

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'exported_data.xlsx');
  }
}