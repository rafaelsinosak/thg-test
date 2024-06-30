import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-vehicle-ownership-chart',
  templateUrl: './vehicle-ownership-chart.component.html',
  styleUrls: ['./vehicle-ownership-chart.component.css'],
  standalone: true,
})
export class VehicleOwnershipChartComponent implements OnInit {
  @ViewChild('vehicleOwnershipChart') vehicleOwnershipChart!: ElementRef;

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.createChart();
  }

  createChart(): void {
    this.apollo
      .watchQuery<any>({
        query: gql`
          query {
            vehicleOwnershipData(year: 2021) {
              idVehiclesAvailable
              vehiclesAvailable
              idYear
              year
              commuteMeansByGender
              geography
              idGeography
              slugGeography
              households
            }
          }
        `,
      })
      .valueChanges.subscribe((result) => {
        const data = result?.data?.vehicleOwnershipData;

        if (data) {
          console.log('Vehicle Ownership Data:', data);

          const ctx = this.vehicleOwnershipChart.nativeElement.getContext('2d');
          new Chart(ctx, {
            type: 'pie',
            data: {
              labels: data.map((item: any) => item.vehiclesAvailable),
              datasets: [
                {
                  label: 'Vehicle Ownership',
                  data: data.map((item: any) => item.commuteMeansByGender),
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
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                },
              },
            },
          });
        }
      });
  }
}
