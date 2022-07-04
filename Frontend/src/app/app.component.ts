import { Component } from '@angular/core';

declare function GenerateExercise(): void;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'RandomGymAngular';
}
