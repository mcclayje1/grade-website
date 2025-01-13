import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GradeHelperService {

  selectedCourse: BehaviorSubject<any> = new BehaviorSubject({})

  constructor() { }

  setSelectedCourse(data: any) {
    this.selectedCourse.next(data)
  }
}
