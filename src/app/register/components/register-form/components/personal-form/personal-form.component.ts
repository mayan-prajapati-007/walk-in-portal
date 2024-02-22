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
  
  userPersonal: UserPersonal;
  jobRoles: any = [];
  private eventsSubscription: Subscription = new Subscription();
  ngOnInit() {
    this.eventsSubscription = this.personalFormSubmissionEvent.subscribe(() => {
      console.log("Hola I am here!");
    });
    this.getJobRoles();
  }

  getJobRoles() {
    this.formDataService.getJobRoles().then((res) => {
      this.jobRoles = res;
      console.log(res);
    });
  }

  constructor(private formDataService: FormDataService) {
    this.userPersonal = {
      email: '',
      profileImage: '',
      firstName: '',
      lastName: '',
      phone: '',
      jobRoles: [],
      resume: '',
      portfolio: '',
      refEmpName: '',
      emailSubscription: false
    };
  }

  onChangesText(event: any) {
    this.userPersonal = {
      ...this.userPersonal,
      [event.name]: event.value
    };
    console.log(this.userPersonal);
  }

  onFileUpload(event: any) {
    let files = event.files;
    if( files.length == 0 ) return;
    let fileToUpload = <File>files[0];
    const formData = new FormData();
  }
}
