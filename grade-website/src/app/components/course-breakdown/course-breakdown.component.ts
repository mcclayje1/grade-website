import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-course-breakdown',
  imports: [],
  templateUrl: './course-breakdown.component.html',
  styleUrl: './course-breakdown.component.scss',
  standalone: true
})
export class CourseBreakdownComponent implements OnInit {

  gradeData: any = {}

  constructor() {}

  ngOnInit(): void {
    const ctx = document.getElementById('myChart');

    // let chart = new Chart(ctx, {
    //   type: 'bar',
    //   data: {
    //     labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    //     datasets: [{
    //       label: '# of Votes',
    //       data: [12, 19, 3, 5, 2, 3],
    //       borderWidth: 1
    //     }]
    //   },
    //   options: {
    //     scales: {
    //       y: {
    //         beginAtZero: true
    //       }
    //     }
    //   }
    // });
  }
}
