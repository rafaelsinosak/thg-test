import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-population-chart',
  templateUrl: './population-chart.component.html',
  styleUrls: ['./population-chart.component.css'],
})
export class PopulationChartComponent implements OnInit, AfterViewInit {
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
            populationData {
              idState
              state
              year
              population
            }
          }
        `,
      })
      .subscribe(
        (result: any) => {
          this.createChart(result.data.populationData);
        },
        (error) => {
          console.error('Error fetching population data:', error);
        }
      );
  }

  createChart(data: any): void {
    const ctx = document.getElementById('populationChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar', // Tipo de gráfico
      data: {
        labels: data.map((d: any) => `${d.state} (${d.year})`), // Labels dos eixos X
        datasets: [
          {
            label: 'Population',
            data: data.map((d: any) => d.population),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}
