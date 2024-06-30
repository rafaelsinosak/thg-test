import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { GraphQLModule } from './graphql.module';
import { AppComponent } from './app.component';
import { PopulationChartComponent } from './population-chart/population-chart.component';
import { VehicleOwnershipChartComponent } from './vehicle-ownership-chart/vehicle-ownership-chart.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MenuComponent } from './menu/menu.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    GraphQLModule,
    DashboardComponent,
    MenuComponent,
    PopulationChartComponent,
    VehicleOwnershipChartComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
