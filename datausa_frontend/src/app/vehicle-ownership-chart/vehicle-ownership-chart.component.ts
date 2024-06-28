import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-vehicle-ownership-chart',
  templateUrl: './vehicle-ownership-chart.component.html',
  styleUrls: ['./vehicle-ownership-chart.component.css'],
})
export class VehicleOwnershipChartComponent implements OnInit, AfterViewInit {
  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    // Registra todos os componentes necessários do Chart.js
    Chart.register(...registerables);
  }

  ngAfterViewInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.apollo
      .query({
        query: gql`
          query {
            vehicleOwnershipData(year: 2021) {
              idVehiclesAvailable
              vehiclesAvailable
              year
              commuteMeansByGender
              geography
            }
          }
        `,
      })
      .subscribe(
        (result: any) => {
          this.createChart(result.data.vehicleOwnershipData);
        },
        (error) => {
          console.error('Error fetching vehicle ownership data:', error);
        }
      );
  }

  createChart(data: any): void {
    const ctx = document.getElementById(
      'vehicleOwnershipChart'
    ) as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'pie', // Tipo de gráfico
      data: {
        labels: data.map((d: any) => d.vehiclesAvailable), // Labels dos segmentos do gráfico
        datasets: [
          {
            label: 'Vehicle Ownership',
            data: data.map((d: any) => d.commuteMeansByGender),
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
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            enabled: true,
          },
        },
      },
    });
  }
}
