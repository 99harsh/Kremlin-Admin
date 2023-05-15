import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfigurationService } from '@services/configuration/configuration.service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
  

  dtTrigger:Subject<any> = new Subject<any>()
  faqForm:FormGroup;
  editFaqForm:FormGroup;
  faqData:any = [];
  constructor(private configService: ConfigurationService, private toastr:ToastrService,
            private fb: FormBuilder,
            private modalService: NgbModal){
              this.faqForm = this.fb.group({
                question: new FormControl('', [Validators.minLength(10), Validators.max(100), Validators.required]),
                answer: new FormControl('', [Validators.required, Validators.min(10)])
              })

              this.editFaqForm = this.fb.group({
                question: new FormControl('', [Validators.minLength(10), Validators.max(100), Validators.required]),
                answer: new FormControl('', [Validators.required, Validators.min(10)])
              })
            }
  ngOnInit(): void {
    this.initData();
  }

  initData = () =>{
    this.dtTrigger = new Subject<any>();
    this.configService.getFAQ().subscribe((res:any)=>{
      if(res.status == 200){
        this.faqData = res.data;
        this.dtTrigger.next(res.data);
      }else{
        this.toastr.error("Something Went Wrong! Backend Error")
      }
    })  
  }

  addFaq = () =>{
    if(this.faqForm.valid){
        this.configService.addFaq(this.faqForm.value).subscribe((res:any)=>{
          if(res.status === 200){
            this.toastr.success("FAQ Added Successfully!")
            this.initData();
            this.faqForm.reset();
          }else{
            this.toastr.error("Something Went Wrong! Backend Error")
          }
        })
    }else{
      console.log(this.faqForm.get('answer'))
      this.toastr.warning("Please provide all the required information.")
    }
  }

  selectedData:any = [];

  openModal = (content, element:any) => {
    this.selectedData = element;
    this.editFaqForm.setValue({
      question: element.QUESTION,
      answer: element.ANSWER
    })
    this.modalService.open(content);
  }

  deleteFAQ = () =>{
    this.configService.deleteFAQ(this.selectedData.ID).subscribe((res:any)=>{
      if(res.status == 200){
        this.toastr.success("FAQ Deleted Successfully!");
        this.initData();
        this.modalService.dismissAll();
      }else{
        this.toastr.error("Something Went Wrong! Backend Error");
        this.modalService.dismissAll();
      }
    })
  }

  editFAQ = () =>{
    if(this.editFaqForm.valid){
      this.configService.editFAQ(this.editFaqForm.value, this.selectedData.ID).subscribe((res:any)=>{
        if(res.status == 200){
          this.toastr.success("FAQ Updated Successfully");
          this.initData();
          this.modalService.dismissAll();
        }else{
          this.toastr.error("Something Went Wrong! Backend Error");
          this.modalService.dismissAll();
        }
      })
    }
  }
}
