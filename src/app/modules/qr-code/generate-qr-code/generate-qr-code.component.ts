import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, Form } from '@angular/forms'
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode'
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import * as htmlToPdfmake from "html-to-pdfmake";
import JSZip from 'jszip';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
import { QrCodeService } from '@services/qr-code/qr-code.service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { format } from 'date-fns'
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-generate-qr-code',
  templateUrl: './generate-qr-code.component.html',
  styleUrls: ['./generate-qr-code.component.scss']
})
export class GenerateQrCodeComponent implements OnInit, AfterViewInit {

  @ViewChild('pdfTable') pdfTable: ElementRef;
  qrCodeForm: FormGroup;
  isLoading: boolean = false;
  elementType: any = NgxQrcodeElementTypes.URL;
  connectionLevel: any = NgxQrcodeErrorCorrectionLevels.HIGH;
  value: any = "Text";
  dummyQr = [{}, {}, {}, {}, {}, {}, {}, {}, {}]
  qrCodes: any = [];
  qrBatch: any = [];
  dtTrigger: Subject<any> = new Subject<any>();
  constructor(private formBuilder: FormBuilder, private qrService: QrCodeService,
    private toastr: ToastrService) {
    this.qrCodeForm = formBuilder.group({
      count: new FormControl(null, [Validators.min(1), Validators.max(100), Validators.pattern("^[0-9]*$"),
      Validators.required]),
      value: new FormControl(null, [Validators.min(1), Validators.pattern("^[0-9]*$"),
      Validators.required])
    })
  }

  ngOnInit(): void {

    this.initData();
  }

  initData = () => {
    this.qrService.getAllQRCodes().subscribe((res: any) => {
      this.qrBatch = res;
    })
  }

  generateQRCode = () => {

    if (this.qrCodeForm.valid) {
      this.isLoading = true;
      this.qrService.generateQRCode(this.qrCodeForm).subscribe((res: any) => {
        if (res.status === 200) {
          this.qrCodes = res.res_qr_codes;
          this.download(this.qrCodes.length);
          this.initData();
          this.toastr.success("QR Generated Successfully!");
          this.qrCodeForm.reset();
        } else {
          this.toastr.error("Something Went Wrong")
        }

        this.isLoading = false;
      })


    } else {

    }
  }


  downloadQRCode = (batchId: string, value:any) => {
    let quantity:any = value
    this.isLoading = true;
    this.qrService.getQRCodeByBatchId(batchId).subscribe((res: any) => {
      if (res.status === 200) {
        this.qrCodes = res.data;
        this.download(quantity);
      } else {
        this.toastr.error("Something Went Wrong!")
      }

      this.isLoading = false;
    })
  }

   download(quantity) {
    MutationObserver = window.MutationObserver;
    let started = true;
    var observer = new MutationObserver(function (mutations, observer) {
      console.log(mutations)
      if (mutations.length > 2) {
        const base64DOM: any = document.getElementsByClassName("coolQRCode")
        let zip = new JSZip();
        if(quantity == base64DOM.length && started){
          started = false;
          for (let i = 0; i < base64DOM.length; i++) {
            let indexArray = base64DOM[i].children[0]['src']
            var binary = atob(indexArray.split(',')[1]);
            var array = [];
            for (let j = 0; j < binary.length; j++) {
              array.push(binary.charCodeAt(j));
            }
            let image = new Blob([new Uint8Array(array)], {
              type: 'image/png'
            });
            zip.file(`QR_CODE${i}.png`, image)
          }
          zip.generateAsync({ type: 'blob' }).then(function(content) {
            // see FileSaver.js
           saveAs(content, `qr_codes_${format(new Date(), 'dd-MMM hh:mm a')}.zip`);

          });
        }
      
      }
    });

    

    observer.observe(document, {
      subtree: true,
      attributes: true
    });

  }

  dateFormat(date: any) {
    return format(new Date(date), "dd-MMM hh:mm a")
  }

  ngAfterViewInit() {
    console.log("Called")
  }






}
