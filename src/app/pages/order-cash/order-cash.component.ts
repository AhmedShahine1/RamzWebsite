import { ApiService } from './../../core/services/products/api.service';
import { BaseService } from './../../core/services/base/base.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from 'src/app/components/components/base/base.component';
import { NgForm } from '@angular/forms';
import { faChevronLeft, faChevronRight, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/core/models/order';
import { Lookup } from 'src/app/core/models/lookup';
import { City } from 'src/app/core/models/city';
import { takeUntil } from 'rxjs';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-order-cash',
  templateUrl: './order-cash.component.html',
  styleUrls: ['./order-cash.component.scss']
})
export class OrderCashComponent extends BaseComponent implements OnInit {
  @ViewChild('carRequest', { static: false }) carRequest: NgForm ;
  @ViewChild('ddlCities') ddlCities: any;
  order = {} as Order;
  regions: Lookup[];
  cities: City[];
  citiesDataSource: City[];
  brands: Lookup[];
  faChevronLeft = faChevronLeft;
  faPaperPlane= faPaperPlane;
  faChevronRight = faChevronRight;
  constructor(private route: ActivatedRoute,  public baseService:BaseService,private apiService:ApiService){
    super();
  }
  ngOnInit() {
    this.route.data.pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      data => {
        this.regions = data.regions.data;
        this.cities = data.cities.data;
      },
      error => {
        console.log(error);
      }
    );

    this.route.queryParams.pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      data => {
        this.order.productId  = data.productId;
        this.order.brandName = data.brandName;
        this.order.categoryName = data.categoryName;
      },
      error => {
        console.log(error);
      }
    );
  }

  ddlRegions_Change(id: string) {
    this.ddlCities.control._parent.status = 'INVALID';
    this.ddlCities.control._parent.value.cityId = null;
    this.ddlCities.valueAccessor.value = null;
  }

  saveOrder() {
    // this.order.productId = "2";
    // this.order.brandName = "تويوتا";
    // this.order.categoryName = "كامرى";
    this.baseService.blockStart();
    this.apiService.saveOrder(1, this.order).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
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
          this.order ={} as Order;
        }
      },
      error => {
        this.baseService.blockStop();
        console.log(error);
      }
    );
  }

}
