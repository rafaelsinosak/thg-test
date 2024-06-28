import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PopulationChartComponent } from './population-chart/population-chart.component';
import { VehicleOwnershipChartComponent } from './vehicle-ownership-chart/vehicle-ownership-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PopulationChartComponent,
    VehicleOwnershipChartComponent,
  ],
  imports: [BrowserModule, FormsModule, HttpClientModule, ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({ uri: 'http://localhost:8000/graphql' }),
        };
      },
      deps: [HttpLink],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
