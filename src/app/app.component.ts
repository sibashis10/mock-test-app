import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Adhyapan :: Mock Test';
  navLinks = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/chapters', label: 'Chapters' },
    { path: '/questions', label: 'Questions' },
  ];

  ngOnInit() {}
}
