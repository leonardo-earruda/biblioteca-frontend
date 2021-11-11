import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-counter',
  templateUrl: './app-table-counter.component.html',
  styleUrls: ['./app-table-counter.component.scss'],
})
export class AppTableCounterComponent implements OnInit {
  @Input() length: number;

  constructor() {
  }

  ngOnInit(): void {
  }
}
