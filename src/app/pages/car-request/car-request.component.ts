import { Component, OnInit, ViewChild } from '@angular/core';
import { faChevronLeft, faPaperPlane, faPhone, faFax, faMessage, faClock, faMapMarker, faPlay, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { NgForm } from '@angular/forms';
import { BaseComponent } from 'src/app/components/components/base/base.component';
import { takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { BaseService } from 'src/app/core/services/base/base.service';
import { ApiService } from 'src/app/core/services/products/api.service';
import { City } from 'src/app/core/models/city';
import { SubCategory } from 'src/app/core/models/subCategory';
import { Product } from 'src/app/core/models/product';
import { Lookup } from 'src/app/core/models/lookup';
import { Order } from 'src/app/core/models/order';
import Swal from 'sweetalert2';
import { ProductService } from 'src/app/core/services/products/product.service';
@Component({
  selector: 'app-car-request',
  templateUrl: './car-request.component.html',
  styleUrls: ['./car-request.component.scss']
})
export class CarRequestComponent extends BaseComponent implements OnInit {

  @ViewChild('carRequest', { static: false }) carRequest: NgForm | undefined;
  faChevronLeft = faChevronLeft;
  faPaperPlane = faPaperPlane;
  faChevronRight = faChevronRight;
  @ViewChild('editForm', { static: true }) editForm: NgForm;
  @ViewChild('ddlCities') ddlCities: any;
  @ViewChild('ddlSubCategories') ddlSubCategories: any;
  @ViewChild('ddlBrands') ddlBrands: any;
  order = {} as Order;
  regions: Lookup[];
  cities: City[];
  citiesDataSource: City[];
  brands: Lookup[];
  subCategories: SubCategory[];
  subCategoriesDataSource: SubCategory[];
  modelYears: Lookup[];
  Cars: Product[];
  constructor(private route: ActivatedRoute, public baseService: BaseService, private apiService: ApiService, private carService: ProductService) {
    super();
  }

  ngOnInit() {
    this.carService.getAll().subscribe(
      (response) => {
        this.Cars = response.data; // Load products
      },
      (error) => {
        console.error('Error fetching products', error);
      }
    );

    this.route.data.pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      data => {
        this.subCategories = data.subCategories.data;
        // Fetch cars correctly
        this.order.brandName = '-- تحديد الماركة --';
        this.modelYears = data.modelYears.data;
      },
      error => {
        console.log(error);
      }
    );
  }

  // ddlRegions_Change(id: string) {
  //   this.citiesDataSource = this.cities.filter((o) => o.regionId === Number(id));
  //   this.ddlCities.control._parent.status = 'INVALID';
  //   this.ddlCities.control._parent.value.cityId = null;
  //   this.ddlCities.valueAccessor.value = null;
  // }

  ddlBrands_Change(id: string) {
    this.subCategoriesDataSource = this.subCategories.filter((o) => o.brand.id === id);
    // this.ddlSubCategories.control._parent.status = 'INVALID';
    // this.ddlSubCategories.control._parent.value.cityId = null;
    // this.ddlSubCategories.valueAccessor.value = null;

  }
  saveCarRequest() {
    if (!this.carRequest?.valid) {
      Swal.fire({
        icon: 'error',
        title: 'خطأ',
        text: 'يرجى ملء جميع الحقول المطلوبة',
      });
      return;
    }
  
    // Correctly bind selected carId
    const requestModel = {
      fullName: this.order.customerName,
      phoneNumber: this.order.customerMobileNo,
      carId: this.order.productId, // <-- Fix: Use selected carId
    };
  
    this.baseService.blockStart();
  
    this.apiService.requestCar(requestModel).subscribe(
      (response: any) => {
        this.baseService.blockStop();
  
        if (response.status) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'تم إرسال طلب السيارة بنجاح!',
            showConfirmButton: false,
            timer: 2000
          });
  
          this.order = {} as Order; // Reset form after success
          this.carRequest?.resetForm(); // Ensure form resets properly
        } else {
          Swal.fire({
            icon: 'error',
            title: 'خطأ',
            text: response.errorMessage || 'حدث خطأ أثناء طلب السيارة',
          });
        }
      },
      (error) => {
        this.baseService.blockStop();
        Swal.fire({
          icon: 'error',
          title: 'خطأ',
          text: 'حدث خطأ أثناء الاتصال بالخادم',
        });
        console.error(error);
      }
    );
  }
  
  saveOrder() {
    this.baseService.blockStart();
    this.apiService.saveOrder(3, this.order).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
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
          this.order = {} as Order;
          this.subCategoriesDataSource = []
        }
      },
      error => {
        this.baseService.blockStop();
        console.log(error);
      }
    );
  }

}
