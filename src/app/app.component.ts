import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { PasswordValidator } from './shared/password.validator';
import { forbiddenNameValidator } from './shared/user-name.validator';
import { RegistrationService } from './registration.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {

  registrationForm!: FormGroup;

  get userName() {
    return this.registrationForm!.get('userName');
  }
  get email() {
    return this.registrationForm!.get('email');
  }
  get alternateEmails() {
    return this.registrationForm!.get('alternateEmails') as FormArray;
  }
  
  addAlternateEmails() {
    this.alternateEmails.push(this.fBuilder.control(''));
  }

  constructor(private fBuilder: FormBuilder, private _registraionService: RegistrationService) {}
  ngOnInit(): void {
    this.registrationForm = this.fBuilder.group({
      userName: ['', [Validators.required, Validators.minLength(3), forbiddenNameValidator(/admin/i /* && /password/i */)]],
      email: [''],
      subscribe: [false],
      password: [''],
      confirmPassword: [''],
      address: this.fBuilder.group({
        city: [''],
        state: [''],
        postalCode: ['']
      }),
      alternateEmails: this.fBuilder.array([])
    },
      {validator: PasswordValidator}
    );
    this.registrationForm.get('subscribe')?.valueChanges
    .subscribe(checkedValue => {
      const email = this.registrationForm?.get('email');
      if (checkedValue) {
        email?.setValidators(Validators.required)
      }
      else {
        email?.clearValidators();
      }
      email?.updateValueAndValidity();
    });
  }

  title = 'reactive-forms';
/*   registrationForm = new FormGroup({
    userName: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    address: new FormGroup({
      city: new FormControl(''),
      state: new FormControl(''),
      postalCode: new FormControl('')
    })
  });
 */

  

  loadApiData() {
    this.registrationForm!.patchValue({
      userName: 'Aegon',
      password: 'skill1',
      confirmPassword: 'skill1',
      address: {
        city: 'Bangalore',
        state: 'Karnataka',
        postalCode: '560098'
      }
    });
  }

  onSubmit() {
    this._registraionService.register(this.registrationForm.value).subscribe(
      response => console.log('Success!', response),
      error => console.error('Error!', error)
    );
  }
}
