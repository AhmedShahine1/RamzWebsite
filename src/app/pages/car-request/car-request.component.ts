import { Component, OnInit, ViewChild } from '@angular/core';
import { faChevronLeft, faPaperPlane, faPhone, faFax, faMessage, faClock, faMapMarker, faPlay, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { NgForm } from '@angular/forms';
import { BaseComponent } from 'src/app/components/components/base/base.component';
import { takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { BaseService } from 'src/app/core/services/base/base.service';
import { ApiService } from 'src/app/core/services/products/api.service';
import { Brand } from 'src/app/core/models/brand';
import { City } from 'src/app/core/models/city';
import { SubCategory } from 'src/app/core/models/subCategory';
import { Lookup } from 'src/app/core/models/lookup';
import { Order } from 'src/app/core/models/order';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-car-request',
  templateUrl: './car-request.component.html',
  styleUrls: ['./car-request.component.scss']
})
export class CarRequestComponent extends BaseComponent implements OnInit {

  @ViewChild('carRequest', { static: false }) carRequest: NgForm | undefined;
  faChevronLeft = faChevronLeft;
  faPaperPlane= faPaperPlane;
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

  constructor(private route: ActivatedRoute, public baseService: BaseService, private apiService: ApiService) {
    super();
  }

  ngOnInit() {
    this.route.data.pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      data => {
        this.cities = data.cities.data;
        this.brands = data.brands.data;
        this.subCategories = data.subCategories.data;
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
          this.order= {} as Order;
          this.subCategoriesDataSource=[]
        }
      },
      error => {
        this.baseService.blockStop();
        console.log(error);
      }
    );
  }

}
