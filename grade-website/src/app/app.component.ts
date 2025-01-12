import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';


@Component({
    selector: 'app-root',
    imports: [RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    standalone: true
})
export class AppComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {
  }

  navigateFromMenu(navigationURL) {
    this.router.navigate([navigationURL])
  }


}
