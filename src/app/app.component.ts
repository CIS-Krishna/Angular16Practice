import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DUMMY_USERS } from './dummy-users';
import { UserComponent } from './user/user.component';
import { TasksComponent } from './tasks/tasks.component';
import { SearchableSelectComponent } from './searchable-select/searchable-select.component';
import * as xlsx from 'xlsx';
import { saveAs } from 'file-saver';
import { BootstrapSelectComponent } from './bootstrap-select/bootstrap-select.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UserComponent, TasksComponent, SearchableSelectComponent, BootstrapSelectComponent, NgSelectModule, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'first-prac';
  peopleLoading:boolean = false;
  option:Array<string> = [];

  complexOptions = [
    { id: 1, label: 'Apple', value: 'fruit' },
    { id: 2, label: 'Banana', value: 'fruit' },
    { id: 3, label: 'Carrot', value: 'vegetable' },
    { id: 4, label: 'Dragonfruit', value: 'fruit' },
    { id: 5, label: 'Eggplant', value: 'vegetable' },
    { id: 6, label: 'Fig', value: 'fruit' },
    { id: 7, label: 'Grape', value: 'fruit' }
  ];


  selectedAccount = 'Adam';
	accounts = [
		{ name: 'Adam', email: 'adam@email.com', age: 12, country: 'United States', child: { state: 'Active' } },
		{ name: 'Homer', email: 'homer@email.com', age: 47, country: '', child: { state: 'Active' } },
		{ name: 'Samantha', email: 'samantha@email.com', age: 30, country: 'United States', child: { state: 'Active' } },
		{ name: 'Amalie', email: 'amalie@email.com', age: 12, country: 'Argentina', child: { state: 'Active' } },
		{ name: 'Estefanía', email: 'estefania@email.com', age: 21, country: 'Argentina', child: { state: 'Active' } },
		{ name: 'Adrian', email: 'adrian@email.com', age: 21, country: 'Ecuador', child: { state: 'Active' } },
		{ name: 'Wladimir', email: 'wladimir@email.com', age: 30, country: 'Ecuador', child: { state: 'Inactive' } },
		{ name: 'Natasha', email: 'natasha@email.com', age: 54, country: 'Ecuador', child: { state: 'Inactive' } },
		{ name: 'Nicole', email: 'nicole@email.com', age: 43, country: 'Colombia', child: { state: 'Inactive' } },
		{ name: 'Michael', email: 'michael@email.com', age: 15, country: 'Colombia', child: { state: 'Inactive' } },
		{ name: 'Nicolás', email: 'nicole@email.com', age: 43, country: 'Colombia', child: { state: 'Inactive' } },
	];



  users:Array<any> = DUMMY_USERS;
  selectedUserID?:string;

  ngOnInit(): void {
    this.option = []
    
  }

  onSelectUser(id:string){
    this.selectedUserID = id;
  }

  get selectedUser(){
    return this.users.find(x=> x.id === this.selectedUserID);
  }

 generateSQLFromExcel(excelFile: File) {
      // Read the Excel file
      const reader = new FileReader();
      reader.onload = (e: any) => {
          const data = new Uint8Array(e.target.result);
          const workbook = xlsx.read(data, { type: 'array' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
  
          // Convert worksheet to JSON array
          const rows = xlsx.utils.sheet_to_json(worksheet, { header: 1 });

          // Create a Set to store unique SQL queries
        const sqlSet = new Set<string>();
        const normalizedSqlSet = new Set<string>();
  
          // Create SQL queries from rows
          // let sqlQueries = '';
          for (let i = 1; i < rows.length; i++) {
              const row: any = rows[i];

              // Extract values from columns (adjust indices as needed)
            const valueA = (row[3] || '').toString().trim();
            const valueB = (row[0] || '').toString().trim();
            const valueD = (row[4] || '').toString().trim();

  
              // Create the SQL insert statement
              const sqlQuery = `INSERT INTO ReportTypeMap (ParentVesselTypeId, ReportType, ReportTypeGroup) VALUES ('${valueA}', '${valueB}', '${valueD}');\n`;
              
              // Create a normalized version of the SQL query for comparison
            const normalizedQuery = sqlQuery.toLowerCase().replace(/\s+/g, ' ').trim();

            // Add normalized query to the Set (duplicates are automatically ignored)
            if (!normalizedSqlSet.has(normalizedQuery)) {
                normalizedSqlSet.add(normalizedQuery);
                sqlSet.add(sqlQuery);
            }
          }
  
          // // Convert SQL queries to a Blob
          // const blob = new Blob([sqlQueries], { type: 'text/sql;charset=utf-8' });
  
          // // Save the file using FileSaver
          // saveAs(blob, 'output.sql');

          // Convert Set to string
        const uniqueSqlQueries = Array.from(sqlSet).join('\n');

        // Convert SQL queries to a Blob
        const blob = new Blob([uniqueSqlQueries], { type: 'text/sql;charset=utf-8' });

        // Save the file using FileSaver
        saveAs(blob, 'output.sql');
      };
  
      reader.readAsArrayBuffer(excelFile);
  }
  
  // Example usage
  // Assume `fileInput` is an <input type="file"> element
  handleFileInput(event: Event) {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files[0]) {
          this.generateSQLFromExcel(input.files[0]);
      }
  }
  }
