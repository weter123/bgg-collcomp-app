import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CollectionComparisonComponent } from './collection-comparison/collection-comparison.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CollectionComparisonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'bgg collection comparison app';
}
