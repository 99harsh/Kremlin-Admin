import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { FormGroup, FormControl, Validators, FormBuilder, Form } from '@angular/forms'
import { ProductService } from '@services/product/product.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class ProductComponent implements OnInit{

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

  productForm:FormGroup;
  constructor(private formBuilder: FormBuilder, private productService: ProductService, private toastr: ToastrService){
    this.productForm = formBuilder.group({
      name: new FormControl(null, [Validators.min(3), Validators.max(50), Validators.required]),
      description: new FormControl(null, [Validators.min(10), Validators.required]),
      key1: new FormControl(null, Validators.required),
      key2: new FormControl(null, Validators.required),
      key3: new FormControl(null, Validators.required),
      value1: new FormControl(null, Validators.required),
      value2: new FormControl(null, Validators.required),
      value3: new FormControl(null, Validators.required)
    })
  }

  ngOnInit(): void {
    
  }

  images:any = [];
  imagesPayload:any = new FormData();
  selectFile = (event:any) =>{
    this.images = [];
    const files = event.target.files;
    this.imagesPayload = new FormData();
    for(let file of files){
        this.images.push(file)
        this.imagesPayload.append("image", file);
    }


    console.log(this.images);

  }

  addNewProduct = () =>{
    if(this.productForm.valid && this.images.length > 0){
      let pdf:any = this.productForm.value;

    let obj = {}
    obj[pdf.key1] = pdf.value1;
    obj[pdf.key2] = pdf.value2;
    obj[pdf.key3] = pdf.value3;
  
    console.log(obj);
    
    delete pdf.key1
    delete pdf.key2
    delete pdf.key3
    delete pdf.value1
    delete pdf.value2
    delete pdf.value3
    pdf.key_features = JSON.stringify(obj);
      console.log(this.productForm.value)
        this.productService.addNewProduct(pdf).subscribe((res:any)=>{
          if(res.status === 200){
            const product_id = res.product_id;

            this.productService.updateProductImages(product_id, this.imagesPayload).subscribe((resp:any)=>{
              if(resp.status === 200){
                this.images = [];
                this.imagesPayload = new FormData();
                this.toastr.success("Product Added Successfully!");
                this.productForm.reset();
              }
            })
   
          }else{
            this.toastr.error("Something Went Wrong!");
          }
        })
    }
  }

}
