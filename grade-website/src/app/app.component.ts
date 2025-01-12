import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule, KeyValuePipe } from '@angular/common';
import * as GradeData from '../../public/assets/grades/results2023-2024.json';
import { BrowserModule } from '@angular/platform-browser';


@Component({
    selector: 'app-root',
    imports: [RouterOutlet, KeyValuePipe, CommonModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    standalone: true
})
export class AppComponent implements OnInit {
  title = 'grade-website';

  gradeData: any = GradeData;
  totalCourses: number = 0;

  infoBoxOpen: boolean = true;

  constructor() {}

  ngOnInit(): void {
    // console.log("grade data: ", this.gradeData["SAB-300"])
    this.totalCourses = Object.keys(this.gradeData)?.length
  }

  receiveUserInput($event: any) {
    console.log("event: ", event)
  }

  closeAlert() {
    this.infoBoxOpen = false
  }
}
