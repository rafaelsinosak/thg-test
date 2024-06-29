import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-population-chart',
  templateUrl: './population-chart.component.html',
  styleUrls: ['./population-chart.component.css'],
})
export class PopulationChartComponent implements OnInit {
  @ViewChild('populationChart') populationChart: ElementRef | undefined;

  constructor(private apollo: Apollo) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
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
      .subscribe((result: any) => {
        if (this.populationChart) {
          this.createChart(result.data.populationData);
        }
      });
  }

  createChart(data: any): void {
    const ctx = this.populationChart!.nativeElement.getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.map((item: any) => item.year),
        datasets: [
          {
            label: 'Population',
            data: data.map((item: any) => item.population),
            borderColor: 'rgba(75, 192, 192, 1)',
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
