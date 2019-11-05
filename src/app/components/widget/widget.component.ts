import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { WidgetService } from 'src/app/service/widget.service';

export interface FilterOpts{
  chart ?: Array<{value: string, active: boolean}>
}

export interface TitleOpts {
  text ?: string;
  titleOpts ?: Array<{name: string , selected: boolean}>;
  value: {text: string, unit: string},
  lift: {sign: string, value: string}
}

export interface Header {
  title ?: TitleOpts;
  compareTo ?: boolean;
  compareToOpts ?: Array<{value:string , selected: boolean}>;
  filter ?: boolean;
  filterOpts ?: any;
  average ?: boolean;
  goalTarget ?: boolean;
}

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss']
})
export class WidgetComponent implements OnInit {
  showFilter = false;
  constructor(private widgetServ: WidgetService) { }

  header : Header = {
    average: false,
    goalTarget: false
  }

  @Input()
  name;


  @Input() titleOpts;

  @Input() 
  set filterOpts(data) {
    if (data) {
      this.header.filter = true;
      this.header.filterOpts = data;
    } else{
      this.header.filter = false;
    }
  }

  @Input() 
  set compareToOpts(data){
    if (data) {
      this.header.compareTo = true;
      this.header.compareToOpts = data;
    }else {
      this.header.compareTo = false;
    }
  }

  @Input()
  isAverage;

  @Input()
  isGoalTarget

  @Output()
  onViewMoreClicked: EventEmitter<any> = new EventEmitter<any>();


  ngOnInit() {
    this.header.title = Object.assign( {} , this.header.title , this.titleOpts);
  }

  changeVisualization(type) {
    this.header.filterOpts.charts.map( (c) => {
      if(c.value === type) {
        c.active = true;
      } else {
        c.active = false;
      }
      return c;
    })
    this.showFilter = false;
    this.widgetServ.changeVisualization(type);
  }

  exportChartAs(type) { 
    this.showFilter = false;
    this.widgetServ.exportChartAs(type);
  }

  viewMoreClicked(){
    this.onViewMoreClicked.emit({name: this.name});
  }
}
