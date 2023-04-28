import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ConfigurationService } from '@services/configuration/configuration.service';
import { environment } from 'environments/environment';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home-carousel',
  templateUrl: './home-carousel.component.html',
  styleUrls: ['./home-carousel.component.scss']
})
export class HomeCarouselComponent implements OnInit{

  carosuelImages:any = "";
  URL:any = environment.url;
  carosuelForm: FormGroup;
  carosuelImageFormData:FormData = new FormData();
  carosuelImageArray:any = [];
  constructor(private configService: ConfigurationService, private toastr: ToastrService,
              private fb: FormBuilder, private modalService: NgbModal){
                this.carosuelForm = this.fb.group({
                  video_url: new FormControl('')
                })
              }
  ngOnInit(): void {
      this.initData();
  }

  selectCarosuelImage = (event:any) =>{
    this.carosuelImageArray = [];
    this.carosuelImageFormData = new FormData();
    for(let file of event.target.files){
      this.carosuelImageArray.push(file)
      this.carosuelImageFormData.append("image", file);
    }
  }

  addImageCarosuel = () =>{
      if(this.carosuelImageArray.length > 0){
          this.carosuelImageFormData.append("video_url", this.carosuelForm.value.video_url)
          this.configService.addImageCarosuel(this.carosuelImageFormData).subscribe((res:any)=>{
            if(res.status === 200){
              this.initData();
              this.toastr.success("Carosuel Added Successfully!");
              this.carosuelForm.reset();
              this.carosuelImageFormData = new FormData();
              this.carosuelImageArray = [];

            }else{
              this.toastr.error("Something Went Wrong! Backend Error");
            }
          })
      }else{
        this.toastr.warning("Please Select Images")
      }
  }
  
  initData = () =>{
    this.configService.getHomeCarosuel().subscribe((res:any)=>{
      console.table(res)
      this.carosuelImages = res;
    })
  }


  deleteElement:any = "";

  openModal = (content, element:any) => {
    console.log("Content Click")
    this.deleteElement = element;
    this.modalService.open(content);
  }

  deleteCarosuel = () =>{
      this.configService.deleteCarosuel(this.deleteElement.CAROUSEL_ID).subscribe((res:any)=>{
        if(res.status == 200){
          this.toastr.success("Deleted Successfully!");
          this.modalService.dismissAll();
          this.initData();
        }else{
          this.toastr.error("Something Went Wrong! Backend Error!")
          this.modalService.dismissAll();
        }
      })
  }
}
