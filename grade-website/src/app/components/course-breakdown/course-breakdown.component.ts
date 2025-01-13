import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';
import { ActivatedRoute, Router } from '@angular/router';
import { GradeHelperService } from '../../services/grade-helper.service';

@Component({
  selector: 'app-course-breakdown',
  imports: [BaseChartDirective],
  templateUrl: './course-breakdown.component.html',
  styleUrl: './course-breakdown.component.scss',
  standalone: true
})
export class CourseBreakdownComponent implements OnInit {

  gradeData: any = {}

  barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
  };
  barChartType: ChartType = 'bar';
  barChartData: ChartData<'bar'> = {
    labels: [ ],
    datasets: [
      { data: [ ], label: 'A', backgroundColor: '#38e44c'},
      { data: [ ], label: 'B', backgroundColor: '#abe438'},
      { data: [ ], label: 'C', backgroundColor: '#e3f23f'},
      { data: [ ], label: 'D', backgroundColor: '#e49f38'},
      { data: [ ], label: 'F', backgroundColor: '#e43e38'},
      { data: [ ], label: 'Other', backgroundColor: '#8f8f8f'},
    ]
  };

  constructor(private route: ActivatedRoute, private router: Router, private gradeHelperService: GradeHelperService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    const ctx = document.getElementById('myChart');

    this.gradeHelperService.selectedCourse.subscribe((course: any) => {
      if (course) {
        this.gradeData = course
        this.updateChartData()
      }
    })
  }
  updateChartData() {
    for (const courseID in this.gradeData) {
      for (const semester in this.gradeData[courseID]["sems"]) {
        this.barChartData["labels"].push(semester)
        this.barChartData["datasets"][0]["data"].push(this.gradeData[courseID]["sems"][semester]["A"])
        this.barChartData["datasets"][1]["data"].push(this.gradeData[courseID]["sems"][semester]["B"])
        this.barChartData["datasets"][2]["data"].push(this.gradeData[courseID]["sems"][semester]["C"])
        this.barChartData["datasets"][3]["data"].push(this.gradeData[courseID]["sems"][semester]["D"])
        this.barChartData["datasets"][4]["data"].push(this.gradeData[courseID]["sems"][semester]["F"])
        this.barChartData["datasets"][5]["data"].push(this.gradeData[courseID]["sems"][semester]["Other"])
      }
    }
  }

  backButtonClicked() {
    this.router.navigate(["home"])
  }
}
