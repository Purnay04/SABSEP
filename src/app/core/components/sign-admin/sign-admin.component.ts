import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormHandlerComponent } from 'src/app/shared/components/form-handler/form-handler.component';
import { FormMeta, customTemplateRef } from 'src/app/shared/types/form';
import { AuthService } from '../../../services/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'sign-admin',
  templateUrl: './sign-admin.component.html',
  styleUrls: ['./sign-admin.component.scss'],
})
export class SignAdminComponent {
  showContent: boolean = false;
  @ViewChild(FormHandlerComponent)
  loginFormComponent!: FormHandlerComponent;

  @ViewChild('forgotPasswordTemplate')
  forgotPasswordTemplateRef!: TemplateRef<any>;
  loginFormMeta: FormMeta = {
    formName: 'loginForm',
    formLabelOrientation: 'Vertical',
    formGroups: {
      loginForm: {
        titlePresent: false,
        designType: 'NormalLayout',
        controls: [
          {
            fieldType: 'textbox',
            inputType: 'text',
            label: 'Email Id',
            name: 'username',
            required: true,
            validators: [Validators.required],
          },
          {
            fieldType: 'textbox',
            inputType: 'password',
            label: 'Password',
            name: 'password',
            required: true,
            validators: [Validators.required],
          },
          {
            fieldType: 'checkbox',
            label: 'Remember Me',
            name: 'rememberMe',
            required: false,
          },
        ],
      },
    },
    footerActions: {
      type: 'SingleFullWidth',
      action: {
        name: 'Sign in',
      },
    },
  };
  customFormTemplate!: customTemplateRef;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    if(this.authService.isLoggedIn() && !this.authService.checkTokenExpired()){
      this.router.navigate(['admin','dashboard'])
    }
  }

  ngAfterViewInit() {
    this.showContent = true;
    this.customFormTemplate = {
      password: this.forgotPasswordTemplateRef,
    };
  }

  signupNav() {
    this.router.navigate(['signup'], {relativeTo: this.route.parent});
  }

  submitEventHandler(formResponse: any) {
    console.log("submitEventHandler", formResponse);
    this.authService
      .doLogin(formResponse[this.loginFormMeta.formName])
      .subscribe({
        next: (response: any) => {
          this.authService.login(response);
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `Welcome back ${response.name}`
          })
          this.router.navigate(['admin','dashboard']);
        },
        error: (err: any) => {
          this.messageService.clear();
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: err.error
          })
        }
      })
  }
}
