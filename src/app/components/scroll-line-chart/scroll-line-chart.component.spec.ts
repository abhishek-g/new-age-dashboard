import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollLineChartComponent } from './scroll-line-chart.component';

describe('ScrollLineChartComponent', () => {
  let component: ScrollLineChartComponent;
  let fixture: ComponentFixture<ScrollLineChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScrollLineChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrollLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
