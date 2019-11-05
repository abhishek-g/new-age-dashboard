import { Component, OnInit, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import * as Highcharts from 'highcharts';

import Stock from 'highcharts/modules/stock';
import { from } from 'rxjs';
import { SeriesColumnOptions } from 'highcharts';
import * as _ from 'lodash';
import { WidgetService } from 'src/app/service/widget.service';
import Exporting from 'highcharts/modules/exporting';
import ExportData from 'highcharts/modules/export-data';
Stock(Highcharts);
Exporting(Highcharts);
ExportData(Highcharts);

@Component({
  selector: 'app-scroll-line-chart',
  templateUrl: './scroll-line-chart.component.html',
  styleUrls: ['./scroll-line-chart.component.scss']
})
export class ScrollLineChartComponent implements OnInit,OnChanges {
  Highcharts = Highcharts;

  @Input() top5Data;
  @Input() name;
  chart;
  constructor(private widgetService: WidgetService) { }

  series: SeriesColumnOptions = {
    type: 'column',
    data: []
  };
  config = {

    title: {
      text: null
    },

    subtitle: {
      text: null
    },

    xAxis: {
      min: 0,
      max: 20,
      categories: [],
      scrollbar: {
        enabled: true
      }
    },
    
    yAxis: {
      title: {
        text: 'Number of Employees'
      }
    },
    series: [this.series],
    exporting: {
      filename: this.name,
      enabled: false
    }
  }

  ngOnInit() {
    
    if (!_.isEmpty(this.top5Data)) {
      this.config.xAxis.categories = this.top5Data.categories;
      this.config.series = this.top5Data.series;
    } else {

      setTimeout( () => {
        for (let x = 0 ; x < 90; x ++) {
          for (let j = 0 ; j< this.config.series.length; j++) {
            this.config.series[j].data.push( Math.round( 989898 * Math.random()));
            this.config.xAxis.categories.push( (x+1));
          }
        }
        this.chart = this.Highcharts.chart('chart1-' + this.name,this.config);
      });
      
    }

    this.widgetService.changeViz.subscribe( (type) => {
      const series = this.chart.options.series;
      series[0].type = type;
      this.chart.update({series: series}, {redraw: true})
    });

    this.widgetService.exportChart.subscribe( (type) => {
      this.exportChart(type);
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.top5Data && !_.isEmpty(changes.top5Data.currentValue)) {
      this.config.xAxis.categories = changes.top5Data.currentValue.categories;
      this.config.xAxis.scrollbar.enabled = false;
      this.config.xAxis.max = changes.top5Data.currentValue.categories.length - 1;
      this.config.series = changes.top5Data.currentValue.series;
      this.chart = this.Highcharts.chart('chart1-' + this.name,this.config);  
    }
  }
  
  exportChart(type) {

    if (type === 'csv') {
      this.chart.downloadCSV();
    } else {
      this.chart.exportChart({
        type: 'application/' + type,
        filename: 'chart-'+ this.name
      });
    }
  }  

}
