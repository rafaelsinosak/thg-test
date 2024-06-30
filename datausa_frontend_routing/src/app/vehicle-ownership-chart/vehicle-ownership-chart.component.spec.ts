import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleOwnershipChartComponent } from './vehicle-ownership-chart.component';

describe('VehicleOwnershipChartComponent', () => {
  let component: VehicleOwnershipChartComponent;
  let fixture: ComponentFixture<VehicleOwnershipChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleOwnershipChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleOwnershipChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
