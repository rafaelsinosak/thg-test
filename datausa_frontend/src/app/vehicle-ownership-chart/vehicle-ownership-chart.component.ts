import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Chart } from 'chart.js';
import gql from 'graphql-tag';

@Component({
  selector: 'app-vehicle-ownership-chart',
  templateUrl: './vehicle-ownership-chart.component.html',
  styleUrls: ['./vehicle-ownership-chart.component.css'],
})
export class VehicleOwnershipChartComponent implements OnInit {
  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.apollo
      .watchQuery({
        query: gql`
          {
            vehicleOwnershipData(year: 2021) {
              idVehiclesAvailable
              vehiclesAvailable
              idYear
              year
              commuteMeansByGender
              geography
              idGeography
              slugGeography
            }
          }
        `,
      })
      .valueChanges.subscribe((result: any) => {
        console.log(result); // Verificar os dados recebidos no console
        this.createChart(result.data.vehicleOwnershipData);
      });
  }

  createChart(data: any): void {
    const ctx = document.getElementById(
      'vehicleOwnershipChart'
    ) as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: data.map((d: any) => d.vehiclesAvailable),
        datasets: [
          {
            data: data.map((d: any) => d.commuteMeansByGender),
            backgroundColor: [
              'rgba(255,99,132,0.2)',
              'rgba(54,162,235,0.2)',
              'rgba(75,192,192,0.2)',
              'rgba(255,206,86,0.2)',
              'rgba(153,102,255,0.2)',
              'rgba(255,159,64,0.2)',
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54,162,235,1)',
              'rgba(75,192,192,1)',
              'rgba(255,206,86,1)',
              'rgba(153,102,255,1)',
              'rgba(255,159,64,1)',
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
