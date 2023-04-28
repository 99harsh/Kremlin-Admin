import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { FormGroup, FormControl, Validators, FormBuilder, Form } from '@angular/forms'
import { ConfigurationService } from '@services/configuration/configuration.service';
import { ToastrService } from 'ngx-toastr';
import { format } from 'date-fns';
@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent implements OnInit {

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '400px',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
  };

  configForm: FormGroup;
  configData: any;
  lastUpdated: any;
  constructor(private formBuilder: FormBuilder, private configSerivce: ConfigurationService, private toastr: ToastrService) {
    this.configForm = formBuilder.group({
      privacy_policy: new FormControl(null, Validators.required)
    })
  }
  ngOnInit(): void {
    this.getInitData();
  }
  getInitData = () =>{
    this.configSerivce.getConfiguration('privacy_policy').subscribe((res:any)=>{
      if(res.status == 200){
        this.lastUpdated = format( new Date(res.data.updated_at), 'dd-MMM-yyyy hh:mm a');
          this.configForm.setValue({
            privacy_policy: res.data.privacy_policy
          })
      }else{
        this.toastr.error("Something Went Wrong! Backend Error")
      }
    })
  }

  updateConfiguration = () => {
    if(this.configForm.valid){
        this.configSerivce.updateConfiguration(this.configForm.value, 'privacy_policy').subscribe((res:any)=>{
          if(res.status == 200){
            this.getInitData();
            this.toastr.success("Updated Successfully!");
          }else{
            this.toastr.error("Something Went Wrong!");
          }
        })
    }
  }

  
}
