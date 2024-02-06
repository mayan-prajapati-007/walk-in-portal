import { Component } from '@angular/core';
import { WalkInSingleComponent } from './components/walk-in-single/walk-in-single.component';

@Component({
  selector: 'app-walk-in-listing',
  standalone: true,
  imports: [WalkInSingleComponent],
  templateUrl: './walk-in-listing.component.html',
  styleUrl: './walk-in-listing.component.scss'
})
export class WalkInListingComponent {

}
