import { takeUntil } from 'rxjs';
import { Component, ViewChild, OnInit } from '@angular/core';
import { faChevronLeft, faPaperPlane, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { NgForm } from '@angular/forms';
import { ContactMessage } from 'src/app/core/models/contactMessage';
import { ApiService } from 'src/app/core/services/products/api.service';
import { BaseComponent } from 'src/app/components/components/base/base.component';
import { BaseService } from 'src/app/core/services/base/base.service';
import Swal from 'sweetalert2';
import { AlertService } from 'src/app/core/services/base/alert.service';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent extends BaseComponent implements OnInit {
  @ViewChild('contactForm', { static: false }) contactForm: NgForm | undefined;
  faChevronLeft = faChevronLeft;
  faPaperPlane= faPaperPlane;
  faChevronRight = faChevronRight;
  contact = {} as ContactMessage;
  constructor(private apiService: ApiService,private alertService: AlertService,
              public baseService: BaseService) {
    super();
  }

  ngOnInit(){

  }

  saveContactMessage() {
    this.baseService.blockStart();
    debugger
    this.apiService.saveContactMessage(this.contact).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      (apiObjectData: any) => {
        this.baseService.blockStop();
        if (apiObjectData.message.type === 'Success') {
          this.alertService.message(apiObjectData.message);
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'سوف يتم التواصل معكم قريبا',
            showConfirmButton: false,
            timer: 2000
          });
          this.contactForm.form.reset()
        }
      },
      error => {
        this.baseService.blockStop();
        console.log(error);
      }
    );
  }
}
