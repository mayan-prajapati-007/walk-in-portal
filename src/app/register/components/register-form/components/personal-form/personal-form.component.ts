import { Component, Input } from '@angular/core';
import { UserPersonal } from '../../../../../interfaces/user';
import { FormDataService } from '../../../../services/form-data/form-data.service';
import { CommonModule } from '@angular/common';
import { Observable, Subscription } from 'rxjs';


@Component({
  selector: 'personal-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './personal-form.component.html',
  styleUrl: './personal-form.component.scss'
})
export class PersonalFormComponent {
  @Input() personalFormSubmissionEvent: Observable<void> = new Observable<void>();
  @Input() copyUserPersonal: (userPersonal: UserPersonal) => void = () => {};
  
  userPersonal: UserPersonal = {} as UserPersonal;
  jobRoles: any = [];
  private eventsSubscription: Subscription = new Subscription();
  errorMessage: string | undefined = undefined;
  
  ngOnInit() {
    this.eventsSubscription = this.personalFormSubmissionEvent.subscribe(this.submitPersonalForm.bind(this));
    this.userPersonal = {
      email: '',
      password: '',
      role: 2,
      profileImage: 'path/to/image',
      firstName: '',
      lastName: '',
      phone: '',
      jobRoles: [],
      resume: 'path/to/resume',
      portfolio: '',
      refEmpName: '',
      emailSubscription: false
    };
    this.copyUserPersonal({
      email: '',
      password: '',
      role: 2,
      profileImage: 'path/to/image',
      firstName: '',
      lastName: '',
      phone: '',
      jobRoles: [],
      resume: 'path/to/resume',
      portfolio: '',
      refEmpName: '',
      emailSubscription: false
    });
    this.getJobRoles();
  }

  getJobRoles() {
    this.formDataService.getJobRoles().then((res) => {
      this.jobRoles = res;
    });
  }

  constructor(private formDataService: FormDataService) {
    
  }

  onChangesText(event: any) {
    this.userPersonal = {
      ...this.userPersonal,
      [event.name]: event.value
    };
    console.log(this.userPersonal);
  }

  submitPersonalForm() {
    console.log("Submitting personal form");
    this.copyUserPersonal(this.userPersonal);
  }
}
