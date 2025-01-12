import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms'
import { CommonModule, KeyValuePipe } from '@angular/common';
import * as GradeData from '../../../../public/assets/grades/results2023-2024.json';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-course-searcher',
  imports: [RouterOutlet, KeyValuePipe, CommonModule, FormsModule],
  templateUrl: './course-searcher.component.html',
  styleUrl: './course-searcher.component.scss',
  standalone: true
})
export class CourseSearcherComponent {
  gradeData: any = GradeData;
  totalCourses: number = 0;
  userInput: string = ""

  infoBoxOpen: boolean = true;

  constructor() {}

  ngOnInit(): void {
    // console.log("grade data: ", this.gradeData["SAB-300"])
    this.totalCourses = Object.keys(this.gradeData)?.length
  }

  closeAlert() {
    this.infoBoxOpen = false
  }
}
