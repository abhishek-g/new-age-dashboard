import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import * as Highcharts from 'highcharts';
import MapModule from 'highcharts/modules/map';
import Data from 'highcharts/modules/data';
import Drilldown from 'highcharts/modules/drilldown';
const mapWorld = require('@highcharts/map-collection/custom/world.geo.json');
import * as _ from 'lodash';
import { HttpClient } from '@angular/common/http';
declare var require;
Data(Highcharts);
Drilldown(Highcharts);
MapModule(Highcharts);


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnChanges {

  Highcharts = Highcharts;
  @Input() data;
  @Input() drillDownData;
  @Output() drilldownClicked  = new EventEmitter<any>();
  @Output() regionSelected  = new EventEmitter<any>();
  @Output() regionDeSelected  = new EventEmitter<any>();
  @Input() chartOptions;
  drilldown = false;
  colorSelection = {};
  mapKey;
  chart;
  point;
  mapConfig: Highcharts.Options  = {
    chart: {
    },

    title: {
      text: null
    },

    subtitle: {
      text: null
    },

    legend: false ? {} : {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle'
    },

    colorAxis: {
      min: 0,
      minColor: '#DDE2EE',
      maxColor: '#009DFF',
      visible: false
    },

    tooltip: {
      useHTML: true,

    },

    mapNavigation: {
      enabled: true,
      buttonOptions: {
        verticalAlign: 'bottom'
      }
    },

    plotOptions: {
      map: {
        states: {
          hover: {
            color: '#EEDD66'
          }
        }
      }
    },

    series: [{
      type: 'map',
      data: [],
      name: 'Countries',
      dataLabels: {
        enabled: true,
        format: '{point.properties.postal-code}'
      }
    }, {
      type: 'mapline',
      data: [],
      color: '#DAF5FF',
      enableMouseTracking: false,
      animation: {
        duration: 500
      }
    }],

    drilldown: {
      activeDataLabelStyle: {
        color: '#FFFFFF',
        textDecoration: 'none',
        textOutline: '1px #000000'
      },
      drillUpButton: {
        relativeTo: Highcharts.defaultOptions.drilldown.drillUpButton.relativeTo,
        position: {
          x: 0,
          y: 60
        }
      }
    },
    exporting: {
      enabled: false
    }

  };
  selectConfig = Object.assign( {} , this.mapConfig , {
    exporting: {
      enabled: false
    }
  })
  constructor(
    private _http: HttpClient
  ) { }

  ngOnInit() {
    this.mapConfig = Object.assign( {} , this.mapConfig , this.chartOptions);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.data && changes.data.currentValue && !_.isEmpty(changes.data.currentValue)) {
      const {data , separators} = this.setUpData();
      this.renderMap(data , separators)

      // drilldown = false, No events : drilldown = true, then set events
      this.checkForDrilldown();
    }

    if (changes.drillDownData && changes.drillDownData.currentValue && !_.isEmpty(changes.drillDownData.currentValue)) {
      this.renderDrilldownMap();
    }

  }

  setUpData() {
    let data = Highcharts.geojson(mapWorld);
    const separators = Highcharts.geojson(mapWorld, 'mapline');
    _.each(data, (i) => {
        i.drilldown = i.properties['hc-key'];
        i.value = this.data[i.properties['hc-key']] ? this.data[i.properties['hc-key']] : 0 ;
    });
    return {data , separators};
  }

  checkForDrilldown() {
    if (this.drilldown) {
      this.mapConfig.chart.events = {
        drilldown: (e) => {
          if (!e.seriesOptions) {
            this.mapKey = 'countries/' + e.point['drilldown'] + '/' + e.point['drilldown'] + '-all';
            this.point = e.point;
          }
          this.chart.setTitle(null, { text: e.point.name });
          this.drilldownClicked.emit({data: this.mapKey});
        },
        drillup: function () {
          this.setTitle(null, { text: '' });
        }
      }
    } else {
      this.selectConfig.plotOptions.map.point = {
        events: {
          select: (e) => {
            const point = (e.target as any)as Highcharts.Point;
            this.colorSelection[point['drilldown']] = point.color;
            this.regionSelected.emit({point: point, select:true, 'level': 'Country'});
          },
          unselect: (e)=> {
            const point = (e.target as any)as Highcharts.Point;
            point.update({color: this.colorSelection[point['drilldown']]} , true);
            this.regionDeSelected.emit({point: point, select:false, 'level': 'State'});
          }
        }
      };
      this.selectConfig.series[0]['allowPointSelect'] = true;
      this.selectConfig.series[0]['states'] = {
        select: {
          color: '#000',
          borderColor: '#FFFFFF'
        }
      }
    }
    if (this.chart) {
      this.colorSelection = {};
      this.chart.destroy();
    }

    const {data , separators} = this.setUpData();
    if (this.drilldown) {
      this.mapConfig.series[0]['data'] = data;
      this.mapConfig.series[1]['data'] = separators;    
      this.chart = this.Highcharts.mapChart('chart' , this.mapConfig);
    }else {
      this.selectConfig.series[0]['data'] = data;
      this.selectConfig.series[1]['data'] = separators;    
      this.chart = this.Highcharts.mapChart('chart' , this.selectConfig);
    }
    
  }

  renderMap(data , separators) {
    this.mapConfig.series[0]['data'] = data;
    this.mapConfig.series[1]['data'] = separators;  
    // this.chart = this.Highcharts.mapChart('chart' , this.mapConfig, () => {});
  }

  renderDrilldownMap() {

    this._http.get('https://code.highcharts.com/mapdata/' + this.mapKey +'.geo.json')
    .subscribe( (response: string) => {

     console.log('RESPONSE' , response);
     let data = Highcharts.geojson(response);

     // Set a non-random bogus value
     _.each(data, (i) =>  {
       console.log(i.properties['hc-a2']);
       i.value = this.drillDownData[i.properties['hc-a2']] ? this.drillDownData[i.properties['hc-a2']] : 0;
     });

     // Hide loading and add series
     this.chart.hideLoading();
     this.chart.addSeriesAsDrilldown(this.point , {
         name: this.point.name,
         data: data,
         dataLabels: {
           enabled: true,
           format: '{point.name}'
         },
         type: 'map',
         states: {
           select: {
             color: '#000000'
           }
         },
         allowPointSelect: true,
         cursor: 'pointer',
         point : {
          events: {
            select: (e) => {
              const point = (e.target as any)as Highcharts.Point;
              this.colorSelection[point['drilldown']] = point.color;
              this.regionSelected.emit({point: point, select:true, 'level': 'State'});
            },
            unselect: (e)=> {
              const point = (e.target as any)as Highcharts.Point;
              point.update({color: this.colorSelection[point['drilldown']]} , true);
              this.regionDeSelected.emit({point: point, select:true, 'level': 'State'});
            }
          }
        }
     });
    });

  }

  toggleDrilldown() {
    this.drilldown = !this.drilldown;
    this.checkForDrilldown();
  }
}
