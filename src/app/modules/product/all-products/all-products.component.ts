import { Component, OnInit } from '@angular/core';
import { ProductService } from '@services/product/product.service';
import { format } from 'date-fns';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'environments/environment';
@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit{

  URL:any = environment.url;
  dtTrigger:Subject<any> = new Subject<any>();
  productData:any = [];
  productDetails:any = {};
  productDetailsForm: FormGroup;
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

  imageArray:any = [];
  imageForm:any = new FormData();
  constructor(private productService: ProductService, private toastr: ToastrService, private modalSerivce: NgbModal,
              private formBuilder: FormBuilder){
                this.productDetailsForm = this.formBuilder.group({
                  name: new FormControl('', [Validators.required]),
                  description: new FormControl('', [Validators.required])
                })
              }
  ngOnInit(): void {
      this.initData();
  }

  initData = () =>{
    this.dtTrigger = new Subject<any>();
    this.productService.getAllProducts().subscribe((res:any)=>{
      console.log("RES", res)
      if(res.status == 200){
        console.log(res.data);
        this.productData = res.data;
        this.dtTrigger.next(res.data);
      }else{
        this.toastr.error("Something Went Wrong! Backend Error");
      }
    })
  }

  formatDate = (date:any) =>{
    if(date === "" || date === undefined || date === null){return ""}
    return format(new Date(date), 'dd-MMM-yyyy hh:mm a');
  }

  openModal = (content:any, element:any) =>{
    this.productDetails = element;

    this.productService.getProductDetails(element.PRODUCT_ID).subscribe((res:any)=>{
      if(res.status === 200){
        const product = res.data;
        this.productDetailsForm.setValue({
          name: product.NAME,
          description: product.DESCRIPTION
        })
        this.productDetails = res.data;
        console.log("Product Description", this.productDetails)
      }else{
        this.toastr.error("Something Went Wrong! Backend Error");
        this.modalSerivce.dismissAll();
      } 
    })
 

    this.modalSerivce.open(content, {size:'xl'});
  }

  selectImage = (event:any) =>{
    const images = event.target.files;
    this.imageArray = [];
    this.imageForm = new FormData();
    if(images.length > 0){
      for(let image of images){
        console.log("images", image)
        this.imageForm.append("image", image);
        this.imageArray.push(image);
      }
    
    }
  }

  updateProduct = () => {
    const tid = this.productDetails.PRODUCT_ID
    console.log(this.imageArray.length)
    if(this.productDetails.NAME != this.productDetailsForm.value.name || this.productDetails.DESCRIPTION != this.productDetailsForm.value.description){
    this.productService.updateProductDescription(this.productDetailsForm.value, tid).subscribe((res:any)=>{
      if(res.status === 200){
        if(this.imageArray.length>0){
          this.updateProductImages();
        }else{
          this.initData();
          this.toastr.success("Product Updated Successfully!");
          this.modalSerivce.dismissAll()
        }
      }else{
        this.toastr.error("Something Went Wrong! Backend Error")
        this.modalSerivce.dismissAll()
      }
    })
    }
    else if(this.imageArray.length > 0){
      this.updateProductImages();
    }


  }

  updateProductImages = () =>{
    const tid = this.productDetails.PRODUCT_ID
    this.productService.updateProductImages(tid, this.imageForm).subscribe((res:any)=>{
      if(res.status == 200){
        this.initData();
        this.toastr.success("Product Updated Successfully!");
        this.modalSerivce.dismissAll()
      }else{
        this.toastr.error("Something Went Wrong! Backend Error")
        this.modalSerivce.dismissAll()
      }
    })
  }

  deleteProductImage = (element:any) =>{
      this.productService.deleteProductImage(element.image_id).subscribe((res:any)=>{
      
        if(res.status == 200){
          this.toastr.success("Image Deleted Successfully!")
          this.modalSerivce.dismissAll();
        }else{
          this.toastr.error("Something Went Wrong! Backend Error!");
        }
      })
  }

  deleteProduct = () =>{
    this.productService.deleteProduct(this.productDetails.PRODUCT_ID).subscribe((res:any)=>{
      if(res.status == 200){
        this.toastr.success("Product Deleted Successfully!");
        this.initData();
        this.modalSerivce.dismissAll();
      }else{
        this.modalSerivce.dismissAll();
        this.toastr.error("Something Went Wrong! Backend Error")
      }
    })
  }

}