import { Component } from '@angular/core';
import { UserReview } from '../../../../../interfaces/user';
import { RegistrationDataService } from '../../../../../services/authentication/registration-data.service';
import { FormDataService } from '../../../../services/form-data/form-data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'review-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './review-form.component.html',
  styleUrl: './review-form.component.scss'
})
export class ReviewFormComponent {
  user: UserReview = {} as UserReview;
  jobRoles: any[] = [];

  constructor(
    private formDataService: FormDataService,
    private registrationDataService: RegistrationDataService
  ) { }

  ngOnInit() {
    this.user = this.registrationDataService.getUser();
    this.registrationDataService.copyUserReviewData();
  }
}
