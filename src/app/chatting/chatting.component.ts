import {
  FormBuilder,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import emailjs from "emailjs-com";
import { init } from "emailjs-com";
init("QmNnFpasgSTuGUeDd");
@Component({
  selector: 'app-chatting',
  templateUrl: './chatting.component.html',
  styleUrls: ['./chatting.component.css']
})
export class ChattingComponent implements OnInit {

  name: string | undefined;
  email: string | undefined;
  Subject: any = [
    'Meal Plan', 
    'Health Issue', 
    'Class timing', 
    'Time Conflict', 
    'Exercises', 
    'Requirements', 
    'Other'
  ];
  message: string | undefined;

  constructor(
    public fb: FormBuilder,
    private _flash: FlashMessagesService,
  ) { }

  myMsgFrm = this.fb.group({
    selectedSubject: [''],
  });

  changeSubject(e: any) {
    this.selectedSubject?.setValue(e.target.value.replace(/[^a-z]+/i, ''));
  }

  get selectedSubject() {
    return this.myMsgFrm.get('selectedSubject');
  }

  ngOnInit() { }

  onSendMessage() {
    if (this.name == undefined || this.email == undefined || !this.myMsgFrm.value.selectedSubject ||  this.message == undefined) {
      this._flash.show('All fields are required', { cssClass: 'alert-danger' })
      return false;
    }

    const templateparams = {
      from_name: this.name + " " + this.email,
      to_name: "mrcalory123@gmail.com",
      subject: this.myMsgFrm.value.selectedSubject,
      message: this.message
    };

    emailjs.send("service_nxg47wj", "template_9u3a0km", templateparams).then(
      (response) => {
        this._flash.show('SUCCESS...', { cssClass: 'alert-success' });
        this.name = '';
        this.email = '';
        this.myMsgFrm.value.selectedSubject = '';
        this.message = '';
      },
      (error) => {
        this._flash.show("FAILED...", { cssClass: 'alert-danger' });
      }
    );
    return true;
  }
}
