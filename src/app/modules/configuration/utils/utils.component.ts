import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfigurationService } from '@services/configuration/configuration.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-utils',
  templateUrl: './utils.component.html',
  styleUrls: ['./utils.component.scss']
})
export class UtilsComponent implements OnInit {

  conversionForm: FormGroup;
  thresholdForm: FormGroup;
  versionForm: FormGroup;
  constructor(private configService: ConfigurationService, private toastr: ToastrService,
    private fb: FormBuilder) {

    this.conversionForm = this.fb.group({
      conversion_rate: new FormControl(null, Validators.required),
    })

    this.thresholdForm = this.fb.group({
      threshold_value: new FormControl(null, Validators.required)
    })

    this.versionForm = this.fb.group({
      app_version: new FormControl(null, Validators.required)
    })
  }

  ngOnInit(): void {
    this.getUtilData();
  }

  setUtilData = (option:string) =>{
    let payload:any;
    if(option === "conversion_rate"){
       payload = {
          key: 'conversion_rate',
          value: this.conversionForm.value.conversion_rate
      }  
    }else if(option === "threshold_points"){
       payload = {
        key: 'threshold_points',
        value: this.thresholdForm.value.threshold_value
    }  
    }else{
       payload  = {
        key : 'version',
        value: this.versionForm.value.app_version
      }
    }
    this.configService.updateUtils(payload).subscribe((res:any)=>{
      if(res.status == 200){
        this.toastr.success("Util Updated Successfully");
      }else{
        this.toastr.error("Something Went Wrong! Backend Error");
      }
    })
  } 

  getUtilData = () => {
    this.configService.getUtils('conversion_rate').subscribe((res: any) => {
      if (res.status === 200) {
        this.conversionForm.setValue({
            conversion_rate: res.value,
        })
      } else {
        this.toastr.error("Something Went Wrong! Backend Error!")
      }
    })

    this.configService.getUtils('threshold_points').subscribe((res: any) => {
      if (res.status === 200) {
        this.thresholdForm.setValue({
        threshold_value:  res.value
      })
      } else {
        this.toastr.error("Something Went Wrong! Backend Error!")
      }
    })

    this.configService.getUtils('version').subscribe((res: any) => {
      if (res.status === 200) {
        this.versionForm.setValue({
          app_version:  res.value
      })
      } else {
        this.toastr.error("Something Went Wrong! Backend Error!")
      }
    })
  }

}
