import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {
@Input({required:true}) task!: any;

@Output() completed = new EventEmitter<string>();

onCompletedTask(){
  this.completed.emit(this.task.id);
}
}
