import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms'
import { CommonModule, KeyValuePipe } from '@angular/common';
import * as GradeData from '../../../../public/assets/grades/results2023-2024.json';

@Component({
  selector: 'app-course-searcher',
  imports: [RouterOutlet, KeyValuePipe, CommonModule, FormsModule],
  templateUrl: './course-searcher.component.html',
  styleUrl: './course-searcher.component.scss',
  standalone: true
})
export class CourseSearcherComponent implements OnInit {
  gradeData: any = GradeData;
  
  totalCourses: number = 0;
  searchResults: number = 0;

  currentCoursesFromSearch: number = 0;

  userInput: string = ""

  infoBoxOpen: boolean = true;

  constructor() {}

  ngOnInit(): void {
    this.totalCourses = Object.keys(this.gradeData)?.length
    this.searchResults = this.totalCourses
  }

  closeAlert() {
    this.infoBoxOpen = false
  }

  returnFilteredCourses() {
    if (this.userInput) {
      // let filteredResults = this.gradeData.filter((grade:any)=> ) // this.searchResults = Object.keys(this.gradeData)?.length
      return this.gradeData.filter((grade: any) => {return })
    }
    this.searchResults = this.totalCourses
    return this.gradeData
  }

}
