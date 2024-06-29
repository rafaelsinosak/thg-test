import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-population-chart',
  templateUrl: './population-chart.component.html',
  styleUrls: ['./population-chart.component.css'],
})
export class PopulationChartComponent implements OnInit {
  @ViewChild('populationChart') populationChart!: ElementRef;

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.createChart();
  }

  createChart(): void {
    this.apollo
      .watchQuery<any>({
        query: gql`
          query {
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
      .valueChanges.subscribe((result) => {
        const data = result?.data?.populationData;

        if (data) {
          // Print data to console
          console.log('Population Data:', data);

          // Get unique years from the data
          const years = [...new Set(data.map((item: any) => item.year))].sort();

          // Get unique states from the data
          const states = [...new Set(data.map((item: any) => item.state))];

          // Create datasets dynamically
          const datasets = states.map((state) => {
            return {
              label: state as string,
              data: data
                .filter((item: any) => item.state === state)
                .map((item: any) => item.population),
              fill: false,
            };
          });

          const allPopulations = data.map((item: any) => item.population);
          // const minPopulation = Math.min(...allPopulations);
          const maxPopulation = Math.max(...allPopulations);

          const ctx = this.populationChart.nativeElement.getContext('2d');
          new Chart(ctx, {
            type: 'line',
            data: {
              labels: years,
              datasets: datasets as any, // Ensure correct type assertion
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                x: {
                  title: {
                    display: true,
                    text: 'Year',
                  },
                },
                y: {
                  title: {
                    display: true,
                  },
                  position: 'left',
                  min: 0,
                  max: maxPopulation + 1000000,
                },
                y1: {
                  title: {
                    display: true,
                  },
                  position: 'right',
                  grid: {
                    drawOnChartArea: false, // Only want the grid lines for one axis to show up
                  },
                  min: 0,
                  max: maxPopulation + 1000000,
                },
              },
              plugins: {
                legend: {
                  display: true, // Show the legend
                },
              },
            },
          });
        }
      });
  }
}
