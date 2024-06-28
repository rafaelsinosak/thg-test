import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Chart } from 'chart.js';
import gql from 'graphql-tag';

@Component({
  selector: 'app-population-chart',
  templateUrl: './population-chart.component.html',
  styleUrls: ['./population-chart.component.css'],
})
export class PopulationChartComponent implements OnInit {
  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.apollo
      .watchQuery({
        query: gql`
          {
            populationData(
              states: ["Alabama", "Florida", "California"]
              startYear: 2013
              endYear: 2021
            ) {
              idState
              state
              idYear
              year
              population
              slugState
            }
          }
        `,
      })
      .valueChanges.subscribe((result: any) => {
        console.log(result); // Verificar os dados recebidos no console
        this.createChart(result.data.populationData);
      });
  }

  createChart(data: any): void {
    const ctx = document.getElementById('populationChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.map((d: any) => d.year),
        datasets: [
          {
            label: 'Alabama',
            data: data
              .filter((d: any) => d.state === 'Alabama')
              .map((d: any) => d.population),
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
          },
          {
            label: 'Florida',
            data: data
              .filter((d: any) => d.state === 'Florida')
              .map((d: any) => d.population),
            borderColor: 'rgba(54,162,235,1)',
            borderWidth: 1,
          },
          {
            label: 'California',
            data: data
              .filter((d: any) => d.state === 'California')
              .map((d: any) => d.population),
            borderColor: 'rgba(75,192,192,1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: {
            beginAtZero: true,
          },
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}
