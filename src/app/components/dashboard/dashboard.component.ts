import { Component, OnInit } from '@angular/core';
import { Header } from '../widget/widget.component';
import { WidgetService } from 'src/app/service/widget.service';
import * as _ from 'lodash';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  mapData = {};
  mapData2 = {};
  chartOptions = {};
  drilldown = false;
  topFiveData = {};
  widget1Opts: Header = {};
  widget2Opts: Header = {};
  seriesForSimpleLineChart = [];
  constructor(private widgetService: WidgetService, private router: Router) {
    this.widget1Opts = this.widgetService.getWidget1Opts();
    const opts = this.widgetService.getWidget1Opts();
    opts.titleOpts.value.text = '';
    opts.titleOpts.lift.value = '';
    this.widget2Opts = opts;
  }

  ngOnInit() {
    this.chartOptions = {
      tooltip: {
        useHtml: true,
        headerFormat: '<strong>22nd Oct - 22nd April</strong><br /><div style="display:inline-block">',
        pointFormat: `<span style="display:inline-block;width:12px;height:12px;background-color:{point.color}">
           </span><span>{point.name}</span>
           <span><b>{point.value} {point.options.tooltip.options.valueSuffix}</b>
           (55%)</span>`,
        footerFormat: '</div>',
        /* formatter: function(options){
          console.log('ARGUMENTS' , this.series , this.point , arguments);
          return `<div style="display:inline-block">
                  <b style="margin-bottom: 8px;">${this.point.name}</b> <br/> 
                  <span style="display:inline-block;float:left;width:30%">${this.point.name}</span> 
                  <span style="display:inline-block;float:right;width: 70%">
                  ${this.point.value} ${options.options.valueSuffix} 
                  (55%) </span>
                  </div>`;
        }, */
        valueSuffix: ' $'
      }
    }
    let data = {
      fo: Math.round(11115 * Math.random()),
      in: Math.round(11115 * Math.random()),
      us: Math.round(11115 * Math.random()),
      jp: Math.round(11115 * Math.random()),
      sc: Math.round(11115 * Math.random())
    };

    setTimeout(() => {
      this.mapData = data;
      const seriesData = { categories: [], series: [{ name: 'Revenue', type: 'bar', data: [] }] };
      _.each(data, (d, i) => {
        console.log(d, i);
        seriesData.categories.push(i);
        seriesData.series[0].data.push(d);
      })
      this.topFiveData = seriesData;
    })


    setTimeout( () => {
      this.seriesForSimpleLineChart = [{
        name: 'Installation',
        data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
      }];
    },2000)

  }


  drilldownClicked(eventData) {
    let data1 = {
      MA: Math.round(500 * Math.random()),
      WA: Math.round(500 * Math.random()),
      CA: Math.round(500 * Math.random()),
      OR: Math.round(500 * Math.random()),
      WI: Math.round(500 * Math.random())
    };

    setTimeout(() => {
      this.mapData2 = data1;

      const seriesData = { categories: [], series: [{ name: 'Revenue', type: 'bar', data: [] }] };
      _.each(data1, (d, i) => {
        console.log(d, i);
        seriesData.categories.push(i);
        seriesData.series[0].data.push(d);
      })
      this.topFiveData = seriesData;
    })
  }

  toggleDrilldown() {
    this.drilldown = !this.drilldown;
  }

  regionSelected(eventData) {
    console.log('Region Selected', eventData);
  }

  regionDeSelected(eventData) {
    console.log('Region De Selected', eventData);
  }

  viewmoreClicked(widgetName){
    this.router.navigate(['view-more', widgetName.name]);
  }
}
