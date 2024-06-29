import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-vehicle-ownership-chart',
  templateUrl: './vehicle-ownership-chart.component.html',
  styleUrls: ['./vehicle-ownership-chart.component.css'],
})
export class VehicleOwnershipChartComponent implements OnInit {
  @ViewChild('vehicleOwnershipChart') vehicleOwnershipChart:
    | ElementRef
    | undefined;

  constructor(private apollo: Apollo) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.apollo
      .query({
        query: gql`
          query {
            vehicleOwnershipData(year: 2021) {
              idVehiclesAvailable
              vehiclesAvailable
              households
            }
          }
        `,
      })
      .subscribe((result: any) => {
        if (this.vehicleOwnershipChart) {
          this.createChart(result.data.vehicleOwnershipData);
        }
      });
  }

  createChart(data: any): void {
    const ctx = this.vehicleOwnershipChart!.nativeElement.getContext('2d');
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: data.map((item: any) => item.vehiclesAvailable),
        datasets: [
          {
            label: 'Vehicles Available',
            data: data.map((item: any) => item.households),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
      },
    });
  }
}
