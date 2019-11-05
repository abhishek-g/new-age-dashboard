import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { UiSwitchModule } from 'ngx-toggle-switch';
import { TrendModule } from 'ngx-trend';

import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';
import { WidgetComponent } from './components/widget/widget.component';
import { ScrollLineChartComponent } from './components/scroll-line-chart/scroll-line-chart.component';
import { ViewMoreComponent } from './components/view-more/view-more.component';
import { AppRouter } from './app.routing';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { SimpleChartComponent } from './components/simple-chart/simple-chart.component';
@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    WidgetComponent,
    ScrollLineChartComponent,
    ViewMoreComponent,
    DashboardComponent,
    SimpleChartComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    UiSwitchModule,
    TrendModule,
    AppRouter,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
