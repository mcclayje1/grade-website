import { Routes } from '@angular/router';
import { CourseSearcherComponent } from './components/course-searcher/course-searcher.component';

export const routes: Routes = [
    {path: "", redirectTo:"/home", pathMatch:"full"},
    {path: "home", component: CourseSearcherComponent},
    // {path: "about", component: AboutComponent},
];
