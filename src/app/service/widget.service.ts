import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WidgetService {

  changeViz: Subject<any> = new Subject<any>();
  exportChart: Subject<any> = new Subject<any>();
  constructor() { }


  changeVisualization(type: string) {
    this.changeViz.next(type);
  }

  exportChartAs(type) {
    this.exportChart.next(type);
  }

  getWidget1Opts() {
    const titleOpts = {
      text: 'Test Widget Structure',
      titleOpts: [],
      value: {
        text: '78',
        unit: 'K'
      },
      lift: {
        sign: 'P',
        value: '0.35 %'
      },
    } ;

    const filterOpts = {
      charts: [{value:'bar', active:true} , {value:'line',active: false}]
    };

    const compareToOpts =  [{value:'Previous Period', selected:false},
                    {value:'Total Transactions', selected:false},
                    {value:'Arrpu', selected: false},
                    {value:'Paying Users', selected:false}]; 
                    
    return {titleOpts , filterOpts , compareToOpts}
  }
}
