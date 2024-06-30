import { Component } from '@angular/core';
import { VehicleOwnershipChartComponent } from '../vehicle-ownership-chart/vehicle-ownership-chart.component';
import { PopulationChartComponent } from '../population-chart/population-chart.component';
import { GraphQLModule } from '../services/graphql.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [
    VehicleOwnershipChartComponent,
    PopulationChartComponent,
    GraphQLModule,
  ],

  standalone: true,
})
export class DashboardComponent {}
