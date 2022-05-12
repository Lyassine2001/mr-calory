import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormArray,
  FormControl
} from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ApplicationService } from 'src/app/services/application.service';
import { FlashMessagesService } from 'angular2-flash-messages';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  owner: string = '';
  isSubmitted = false;
  Dietitian: any = ['Jane Doe', 'Sarah Smith', 'Mary Mickel'];
  Coach: any = ['John Smith', 'Mike Ross', 'Liam James'];
  Program: Array<any> = [
    { name: 'Meal', value: 'Personalized meal plan' },
    { name: 'Tips', value: 'Information and tips' },
    { name: 'Support', value: 'Encouragement and support' },
    { name: 'Tracking', value: 'Tracking progress' },
  ];
  paymentNumber: string = '';
  receiptSrc: string = '';
  application: any;

  constructor(
    public fb: FormBuilder,
    private _flash: FlashMessagesService,
    private _applicationService: ApplicationService,
    private _userService: UserService,
  ) { }

  myApplicationFrm = this.fb.group({
    dietitianName: [''],
    coachName: [''],
    class: ['morning'],
    checkProgram: this.fb.array([]),
    paymentNumber: '',
    file: new FormControl(''),
    fileSource: new FormControl('')
  });

  changeDietitian(e: any) {
    this.dietitianName?.setValue(e.target.value.replace(/[^a-z]+/i, ''));
  }

  changeCoach(e: any) {
    this.coachName?.setValue(e.target.value.replace(/[^a-z]+/i, ''));
  }

  onProgramChange(e: any) {
    const checkProgram: FormArray = this.myApplicationFrm.get('checkProgram') as FormArray;
    if (e.target.checked) {
      checkProgram.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkProgram.controls.forEach((item: any) => {
        if (item.value == e.target.value) {
          checkProgram.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  onFileChange(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.receiptSrc = reader.result as string;
        this.myApplicationFrm.patchValue({
          fileSource: reader.result
        });
      };
    }
  }

  get dietitianName() {
    return this.myApplicationFrm.get('dietitianName');
  }

  get coachName() {
    return this.myApplicationFrm.get('coachName');
  }

  ngOnInit() {
    const user = this._userService.getCurrentUser();
    this.owner = user.id;
    this._fetchApplication();
  }

  private _fetchApplication() {
    const currentUser = this._userService.getCurrentUser();
    const query = { owner: currentUser.id };
    this._applicationService.getApplication(query).subscribe((resp: any) => {
      this.application = resp.applications;
    })
  }

  onSubmit() {
    this.isSubmitted = true;

    if (this.owner == '' || this.receiptSrc == '' || this.paymentNumber == '' || !this.myApplicationFrm.value.dietitianName || !this.myApplicationFrm.value.checkProgram || !this.myApplicationFrm.value.coachName) {
      this._flash.show('All fields are required', { cssClass: 'alert-danger' })
      return false;
    }

    const application = {
      dietitian: this.myApplicationFrm.value.dietitianName,
      coach: this.myApplicationFrm.value.coachName,
      time: this.myApplicationFrm.value.class,
      program: this.myApplicationFrm.value.checkProgram,
      owner: this.owner,
      payment_number: this.paymentNumber,
    }

    this._applicationService.saveApplication(application).subscribe(() => {
      this._flash.show('Application created', { cssClass: 'alert-success' });
      this._fetchApplication();
    });
    return true;
  }

}
