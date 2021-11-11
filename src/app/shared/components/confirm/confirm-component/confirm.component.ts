import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmButton } from 'src/app/core/models/confirm-button.model';
import { ConfirmComponentData } from 'src/app/core/models/confirm-component-data.model';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss'],
})
export class ConfirmComponent implements OnInit {
  buttonTrue: ConfirmButton;
  buttonFalse: ConfirmButton;

  constructor(@Inject(MAT_DIALOG_DATA) public data: ConfirmComponentData) {
    this.buttonTrue = data.buttonTrue;
    this.buttonFalse = data.buttonFalse;
  }

  ngOnInit(): void {
  }
}
