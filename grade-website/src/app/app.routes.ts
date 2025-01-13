import { Routes } from '@angular/router';
import { CourseSearcherComponent } from './components/course-searcher/course-searcher.component';
import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';
import { CourseBreakdownComponent } from './components/course-breakdown/course-breakdown.component';

export const routes: Routes = [
    {path: "", redirectTo:"/home", pathMatch:"full"},
    {path: "home", component: CourseSearcherComponent},
    {path: "test", component: CourseBreakdownComponent},
    {path: "courses/:courseID", component: CourseBreakdownComponent},
    {path: "contact", component: ContactComponent},
    {path: "about", component: AboutComponent}
];
