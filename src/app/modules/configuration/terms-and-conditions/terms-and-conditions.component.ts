import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ConfigurationService } from '@services/configuration/configuration.service';
import { format } from 'date-fns';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styleUrls: ['./terms-and-conditions.component.scss']
})
export class TermsAndConditionsComponent implements OnInit{
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
  lastUpdated:any;
  configForm: FormGroup;
  configData: any;
  constructor(private formBuilder: FormBuilder, private configSerivce: ConfigurationService, private toastr: ToastrService) {
    this.configForm = formBuilder.group({
      terms_and_conditions: new FormControl(null, Validators.required)
    })
  }
  ngOnInit(): void {
    this.getInitData();
  }

  getInitData = () =>{
    this.configSerivce.getConfiguration('terms_and_conditions').subscribe((res:any)=>{
      if(res.status == 200){
        this.lastUpdated = format(new Date(res.data.updated_at), 'dd-MMM-yyyy hh:mm a')
        this.configForm.setValue({
          terms_and_conditions: res.data.terms_and_conditions
        });
      }else{
        this.toastr.error("Something Went Wrong! Backend Error")
      }
    })
  }

  updateConfiguration = () => {
    if(this.configForm.valid){
        this.configSerivce.updateConfiguration(this.configForm.value, 'terms_and_conditions').subscribe((res:any)=>{
          if(res.status == 200){
            this.toastr.success("Updated Successfully!");
            this.getInitData();
          }else{
            this.toastr.error("Something Went Wrong!");
          }
        })
    }
  }
}
