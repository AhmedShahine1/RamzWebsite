import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faChevronLeft, faChevronRight, faCoins, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { takeUntil } from 'rxjs';
import { BaseComponent } from 'src/app/components/components/base/base.component';
import { Calculate } from 'src/app/core/models/calculate';
import { City } from 'src/app/core/models/city';
import { Lookup } from 'src/app/core/models/lookup';
import { Order } from 'src/app/core/models/order';
import { OrderDetail } from 'src/app/core/models/orderDetails';
import { AlertService } from 'src/app/core/services/base/alert.service';
import { BaseService } from 'src/app/core/services/base/base.service';
import { ApiService } from 'src/app/core/services/products/api.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-order-installment',
  templateUrl: './order-installment.component.html',
  styleUrls: ['./order-installment.component.scss']
})
export class OrderInstallmentComponent extends BaseComponent implements OnInit {

  @ViewChild('calculateform', { static: false }) calculateform: NgForm ;
  faChevronLeft = faChevronLeft;
  faPaperPlane= faPaperPlane;
  faCoins=faCoins;
  faChevronRight = faChevronRight;

  @ViewChild('ddlCities') ddlCities: any;
  order = {} as Order;
  orderDetail = {} as OrderDetail;
  calculate = {} as Calculate;
  regions: Lookup[];
  cities: City[];
  citiesDataSource: City[];
  brands: Lookup[];
  banks: Lookup[];
  workSectors: Lookup[];

  constructor(private route: ActivatedRoute, private alertService: AlertService, public baseService: BaseService, private apiService: ApiService) {
    super();
  }

  ngOnInit() {
    this.route.data.pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      data => {
        this.regions = data.regions.data;
        this.cities = data.cities.data;
        this.banks = data.banks.data;
        this.workSectors = data.workSectors.data;
      },
      error => {
        console.log(error);
      }

    );

    this.route.queryParams.pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      data => {
        this.order.productId = data.productId;
        this.order.brandName = data.brandName;
        this.order.categoryName = data.categoryName;
        this.calculate.productId = data.productId;
        this.calculate.optionId = data.optionId;
        this.calculate.subCategoryId = data.subCategoryId;
        this.calculate.installmentPrice = data.installmentPrice;
        this.calculate.modelYear = data.modelYear;
      },
      error => {
        console.log(error);
      }
    );
    this.calculate.salaryBankId = 0;
    this.calculate.worksectorId = 0;
    this.orderDetail.monthlyInstalmentAmount =0;
    this.orderDetail.totalAmount = 0;
  }

  ddlRegions_Change(id: string) {
    this.ddlCities.control._parent.status = 'INVALID';
    this.ddlCities.control._parent.value.cityId = null;
    this.ddlCities.valueAccessor.value = null;
  }

  installmentMonths_change(value: number) {
    debugger
    this.calculate.installmentMonths = value;
    this.baseService.blockStart();
    this.apiService.calculate(this.calculate).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      (apiObjectData: any) => {
        this.baseService.blockStop();
        this.orderDetail = apiObjectData.data as OrderDetail;
        this.orderDetail.downPaymentAmount = this.orderDetail.minDownPaymentAmount;
        this.orderDetail.lastPaymentAmount = this.orderDetail.maxLastPaymentRatioAmount;
        // apiObjectData.re
        // if (apiObjectData.message.type === 'Success') {
        //   Swal.fire({
        //     position: 'center',
        //     icon: 'success',
        //     title: 'سوف يتم التواصل معكم قريبا',
        //     showConfirmButton: false,
        //     timer: 2000
        //   });
        // }
      },
      error => {
        this.baseService.blockStop();
        console.log(error);
      }
    );
  }

  changData(){
    debugger
    // if(this.orderDetail!=null&&this.orderDetail.totalAmount!=0){
      this.baseService.blockStart();
      this.apiService.calculate(this.calculate).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
        (apiObjectData: any) => {
          this.baseService.blockStop();
          this.orderDetail = apiObjectData.data as OrderDetail;
          this.orderDetail.downPaymentAmount = this.orderDetail.minDownPaymentAmount;
          this.orderDetail.lastPaymentAmount = this.orderDetail.maxLastPaymentRatioAmount;
        },
        error => {
          this.baseService.blockStop();
          console.log(error);
        }
      );
    // }
  }

  txtDownPaymentAmount_input() {
    if (this.orderDetail.downPaymentAmount > this.orderDetail.maxDownPaymentAmount) {
      // this.alertService.warning('عفوا لا يمكن ان تزيد الدفعة المقدمة عن ' + this.orderDetail.maxDownPaymentAmount);
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'عفوا لا يمكن ان تزيد الدفعة المقدمة عن ' + this.orderDetail.maxDownPaymentAmount,
        showConfirmButton: false,
        timer: 2000
      });
    }
    else {
      this.orderDetail.monthlyInstalmentAmount = (this.orderDetail.totalAmount - this.orderDetail.downPaymentAmount - this.orderDetail.lastPaymentAmount) / this.calculate.installmentMonths;
    }
  }

  txtLastPaymentAmount_input() {
    if (this.orderDetail.lastPaymentAmount > this.orderDetail.maxLastPaymentRatioAmount) {
      // this.alertService.warning('عفوا لا يمكن ان تزيد الدفعة المؤخرة عن ' + this.orderDetail.maxLastPaymentRatioAmount);
      this.orderDetail.lastPaymentAmount = this.orderDetail.maxLastPaymentRatioAmount;
      Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'عفوا لا يمكن ان تزيد الدفعة المؤخرة عن ' + this.orderDetail.maxLastPaymentRatioAmount,
            showConfirmButton: false,
            timer: 2000
          });
         
    }
    else {
      this.orderDetail.monthlyInstalmentAmount = (this.orderDetail.totalAmount - this.orderDetail.downPaymentAmount - this.orderDetail.lastPaymentAmount) / this.calculate.installmentMonths;
    }
  }


  saveOrder() {
    this.order.remarks = JSON.stringify(this.orderDetail);
    this.baseService.blockStart();
    this.apiService.saveOrder(2, this.order).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      (apiObjectData: any) => {
        this.baseService.blockStop();
        if (apiObjectData.message.type === 'Success') {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'سوف يتم التواصل معكم قريبا',
            showConfirmButton: false,
            timer: 2000
          });
        }
      },
      error => {
        this.baseService.blockStop();
        console.log(error);
      }
    );
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
}

