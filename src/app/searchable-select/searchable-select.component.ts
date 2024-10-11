import {MatSelectModule} from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // Needed for ngModel two-way binding

import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-searchable-select',
  standalone: true,
  imports: [MatSelectModule, FormsModule, CommonModule],
  templateUrl: './searchable-select.component.html',
  styleUrl: './searchable-select.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchableSelectComponent),
      multi: true
    }
  ]
})

export class SearchableSelectComponent {
  @Input() options: any[] = []; // Accept any type of options (objects or strings)
  @Input() displayField: string = ''; // Field to display in the select dropdown
  @Input() valueField: string = '';   // Field to use as the select value
  @Input() label: string = 'Select';
  @Input() placeholder: string = 'Choose an option';

  selectedValue: any;
  searchTerm: string = '';

  onChange: any = () => {};
  onTouched: any = () => {};

   // Called when the user selects a value
   setValue(value: any) {
    this.selectedValue = value;
    this.onChange(value); // Notify parent form control about the value change
  }


  // Filter options based on search term dynamically
  filteredOptions() {
    return this.options.filter(option => {
      const displayValue = typeof option === 'object' ? option[this.displayField] : option;
      return displayValue.toLowerCase().includes(this.searchTerm.toLowerCase().trim());
    });
  }

  // Get the display text dynamically (either a field in an object or the value itself)
  getDisplayValue(option: any) {
    return typeof option === 'object' ? option[this.displayField] : option;
  }

  getDisplayValueBySearchValue(value:any){
    if(value != null){
      let a = this.options.find(option => option[this.valueField] == value)[this.displayField];
      return a;
    }

    return null
  }

  // Get the actual value to bind to mat-option (dynamically fetch the valueField or use the string directly)
  getOptionValue(option: any) {
    return typeof option === 'object' ? option[this.valueField] : option;
  }

   // ControlValueAccessor methods
   writeValue(value: any): void {
    this.selectedValue = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // Handle disabled state
  }

   // Handle keydown to prevent closing when pressing 'Escape' in the search box
   handleKeydown(event: KeyboardEvent) {
    if (event.key === ' ') {
      event.stopPropagation();  // Prevent mat-select from closing
    }
  }
}

