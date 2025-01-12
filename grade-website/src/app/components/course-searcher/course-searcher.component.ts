import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { CommonModule, KeyValuePipe } from '@angular/common';
import * as GradeData from '../../../../public/assets/grades/results2023-2024.json';
import { SearchPipe } from '../pipes/search-pipe';

@Component({
  selector: 'app-course-searcher',
  imports: [KeyValuePipe, CommonModule, FormsModule, SearchPipe],
  templateUrl: './course-searcher.component.html',
  styleUrl: './course-searcher.component.scss',
  standalone: true
})
export class CourseSearcherComponent implements OnInit {
  
  gradeData: any = GradeData;

  totalCourses: number = 0;
  searchResultsCount: number = 0;

  userInput: string = ""
  infoBoxOpen: boolean = true;

  constructor() {}

  ngOnInit(): void {
    this.totalCourses = Object.keys(this.gradeData)?.length
  }

  closeAlert() {
    this.infoBoxOpen = false
  }

}
