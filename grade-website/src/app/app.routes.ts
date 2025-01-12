import { Routes } from '@angular/router';
import { CourseSearcherComponent } from './components/course-searcher/course-searcher.component';
import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';

export const routes: Routes = [
    {path: "", redirectTo:"/home", pathMatch:"full"},
    {path: "home", component: CourseSearcherComponent},
    {path: "courses/:courseID", component: CourseSearcherComponent},
    {path: "contact", component: ContactComponent},
    {path: "about", component: AboutComponent}
];
