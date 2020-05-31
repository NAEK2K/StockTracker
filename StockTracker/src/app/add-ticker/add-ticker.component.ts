import { Component, OnInit, Input } from '@angular/core';
import { Ticker } from '../ticker';

@Component({
  selector: 'app-add-ticker',
  templateUrl: './add-ticker.component.html',
  styleUrls: ['./add-ticker.component.css']
})
export class AddTickerComponent implements OnInit {

  trackedTickers: Ticker[] = [];

  @Input() ticker: string;

  ttick: Ticker = {
    ticker: 'WEED',
    value: 420,
    change: 4.20,
    percentChange: 42.0
  }

  constructor() { 
    
  }

  ngOnInit(): void {
  }

  addTicker(): void {
    this.trackedTickers.push();
  }

  

}
