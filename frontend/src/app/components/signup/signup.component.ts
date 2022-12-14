import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm!: FormGroup;

  constructor(private authService: AuthService, private router: Router){}

  ngOnInit(): void{
    this.signupForm = this.createFormGroup();
  }

  createFormGroup(): FormGroup{
    return new FormGroup({
      firstName: new FormControl("",[Validators.required, Validators.minLength(2)]),
      lastName: new FormControl("",[Validators.required, Validators.minLength(2)]),
      otherNames: new FormControl(""),
      country: new FormControl("",[Validators.required, Validators.minLength(2)]),
      email: new FormControl("",[Validators.required, Validators.email]),
      confirmEmail: new FormControl("",[Validators.required, Validators.email]),
      telephoneNumber: new FormControl("",[Validators.required, Validators.minLength(2)]),
      password: new FormControl("",[Validators.required, Validators.minLength(7)]),
      confirmPassword: new FormControl("",[Validators.required, Validators.minLength(7)]),

    })
  }

  signup():void{
    this.authService.signup(this.signupForm.value).subscribe((msg: any)=>{
      console.log(msg)
      this.router.navigate(["login"])
    })
  }
}
