import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { BreadcrumbService } from '@sabspl-frontend/shared';
import { FormMeta } from '@sabspl-frontend/shared-module/types/form';

@Component({
  selector: 'sabspl-frontend-admin-settings',
  templateUrl: './admin-settings.component.html',
  styleUrl: './admin-settings.component.scss',
})
export class AdminSettingsComponent {
  userInfoSettingsFormMeta: FormMeta = {
    formName: 'userInfoSettingsForm',
    formLabelOrientation: 'Vertical',
    formGroups: {
      userBasicInfo: {
        titlePresent: true,
        title: 'User Info',
        designType: 'NormalLayout',
        styleClass: '!gap-2',
        controls: [
          {
            fieldType: 'textbox',
            inputType: 'text',
            label: 'Username',
            name: 'username',
            required: true,
            validators: [Validators.required],
            width: '20rem',
            hidden: false,
          },
          {
            fieldType: 'textbox',
            inputType: 'email',
            label: 'Email Id',
            name: 'email',
            required: true,
            validators: [Validators.required],
            width: '20rem',
            hidden: false,
          }
        ],
      },
      passwordDetails: {
        titlePresent: true,
        title: 'Password',
        designType: 'NormalLayout',
        styleClass: '!gap-2',
        controls: [
          {
            fieldType: 'textbox',
            inputType: 'text',
            label: 'Current Password',
            name: 'currPassword',
            required: false,
            width: '20rem',
            hidden: false,
          },
          {
            fieldType: 'textbox',
            inputType: 'text',
            label: 'New Password',
            name: 'password',
            required: false,
            width: '20rem',
            hidden: false,
          },
          {
            fieldType: 'textbox',
            inputType: 'text',
            label: 'Re-Type Password',
            name: 'rePassword',
            required: false,
            width: '20rem',
            hidden: false,
          },
        ]
      },
      configurationDetails: {
        titlePresent: true,
        title: 'Configuration Details',
        designType: 'TableLayout',
        styleClass: 'gap-4',
        controls: [
          {
            fieldType: 'textbox',
            inputType: 'email',
            label: 'Recovery Email',
            name: 'recoveryEmail',
            required: false,
            width: '20rem',
            hidden: false,
          },
          {
            fieldType: 'dropDown',
            label: 'Logging Mode',
            options: [
              {name: 'Error', code: 'error'},
              {name: 'Warn', code: 'warn'},
              {name: 'Info', code: 'info'},
              {name: 'Debug', code: 'debug'}
            ],
            name: 'password',
            required: false,
            width: '20rem',
            hidden: false,
          }
        ]
      }
    },
    footerActions: {
      type: 'SplitInTwoActions',
      action: {
        name: 'Save',
      },
    },
  };

  constructor(
    private breadcrumbService: BreadcrumbService
  ) {}

  ngOnInit() {
    this.breadcrumbService.addItem({
      name: "Settings",
      url: "/admin/settings"
    });
  }

  submitEventHandler(formResponse: any) {

  }

  closeQuestionForm(eventData?: any) {
  }
}
