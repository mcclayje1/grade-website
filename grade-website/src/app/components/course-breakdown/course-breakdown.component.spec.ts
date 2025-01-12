import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseBreakdownComponent } from './course-breakdown.component';

describe('CourseBreakdownComponent', () => {
  let component: CourseBreakdownComponent;
  let fixture: ComponentFixture<CourseBreakdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseBreakdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseBreakdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
