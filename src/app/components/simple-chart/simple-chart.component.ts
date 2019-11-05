import { Component, OnInit, Input, OnChanges, SimpleChanges, AfterViewInit, ViewEncapsulation } from '@angular/core';
import * as Highcharts from 'highcharts';
import Exporting from 'highcharts/modules/exporting';
import ExportingData from 'highcharts/modules/export-data';
import Stocks from 'highcharts/modules/stock';
Exporting(Highcharts);
ExportingData(Highcharts);
Stocks(Highcharts);

@Component({
  selector: 'app-simple-chart',
  templateUrl: './simple-chart.component.html',
  styleUrls: ['./simple-chart.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SimpleChartComponent implements OnChanges, AfterViewInit {

  Highcharts = Highcharts;

  @Input()
  name;

  @Input()
  set type(d){
    if (d) {
      this.config.chart.type = d;
    }
  }

  @Input()
  set yAxis(d){
    this.config.yAxis = Object.assign({} , this.config.yAxis , d);
  }

  @Input()
  set xAxis(d){
    this.config.xAxis = Object.assign({} , this.config.xAxis , d);
  }

  @Input()
  series

  @Input()
  set tooltip(d){
    this.config.tooltip = Object.assign({} , this.config.tooltip , d);
  }

  chart;
  constructor() { }

  config: any = {

    chart: {
      type: 'line'
    },

    title: {
      text: null,
    },

    subtitle: {
      text: null
    },
    
    yAxis: {
      title: {
        text: 'Number of Employees'
      }
    },
   
    exporting: {
      filename: this.name,
      enabled: false
    },

    credits: {
      enabled: false
    }
  }

  ngAfterViewInit() {
    // this.drawChart();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.series && changes.series.currentValue && changes.series.currentValue.length > 0) {
      this.config.series = changes.series.currentValue;
      this.drawChart();
    }
  }

  drawChart(){
    if (this.chart){
      this.chart.destroy();
      this.chart = this.chart.update(this.config , {redraw: true});
    } else {
      this.chart = this.Highcharts.chart('chart1-' + this.name , this.config);
    }
  }
}
