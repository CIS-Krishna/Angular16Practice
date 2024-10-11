import { Component, Input, OnInit } from '@angular/core';
import { TaskComponent } from './task/task.component';
import { dummyTasks } from '../dummy-tasks';
import { SearchableSelectComponent } from '../searchable-select/searchable-select.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

type USER = {
  id: string;
  name: string;
  avatar: string;
};

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [TaskComponent, SearchableSelectComponent, ReactiveFormsModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent implements OnInit {
  @Input({ required: true }) selectedUser!: USER;
  tasks:Array<any> = dummyTasks;

  anotherOptionSet = [
    { value: 'Item A', label: 'Label A' },
    { value: 'Item B', label: 'Label B' },
    { value: 'Item C', label: 'Label C' }
  ];

  // Define a form group with a form control for the select component
  form: FormGroup = new FormGroup({
    selectedOption: new FormControl(null)
  });

  constructor(
    private formBuilder: FormBuilder
  ){}


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }
  onCompletedTask(id:string){
   this.tasks = this.tasks.filter(x=> x.id !== id);
  }

  expression(){
    console.log(this.form.controls['selectedOption'].value);
  }


}
