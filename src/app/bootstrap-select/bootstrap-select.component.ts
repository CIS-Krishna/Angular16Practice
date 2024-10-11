import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
declare var $: any;  // This is required for Bootstrap-select


@Component({
  selector: 'app-bootstrap-select',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bootstrap-select.component.html',
  styleUrl: './bootstrap-select.component.css'
})
export class BootstrapSelectComponent implements AfterViewInit {

  ngAfterViewInit() {
    // Initialize the selectpicker after the view is initialized
    // (document.getElementsByClassName('.selectpicker') as any).selectpicker();

    // document.getElementById('preloader').classList.add('hide');
    ($('.selectpicker') as any).selectpicker();
  }
}
