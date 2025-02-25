import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faChevronLeft, faPaperPlane, faCoins, faCar, faBrush, faFillDrip, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { takeUntil } from 'rxjs';
import { BaseComponent } from 'src/app/components/components/base/base.component';
import { ApiObjectData } from 'src/app/core/models/base/apiObjectData';
import { Brand } from 'src/app/core/models/brand';
import { City } from 'src/app/core/models/city';
import { Lookup } from 'src/app/core/models/lookup';
import { Order } from 'src/app/core/models/order';
import { Product } from 'src/app/core/models/product';
import { SubCategory } from 'src/app/core/models/subCategory';
import { BaseService } from 'src/app/core/services/base/base.service';
import { ApiService } from 'src/app/core/services/products/api.service';
import { ProductService } from 'src/app/core/services/products/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss']
})
export class CarsComponent extends BaseComponent implements OnInit{

  faChevronLeft = faChevronLeft;
  faCoins= faCoins;
  faCar = faCar;
  faFillDrip = faFillDrip;
  faChevronRight = faChevronRight;
  brands: Brand[];
  brand={} as Brand;
  subCategories: SubCategory[];
  subCategoriesDataSource: SubCategory[];
  modelYears: Lookup[];
  products:Product[];
  allProduct:Product[];
  url:any;
  brandParamId:any;
  constructor(private route: ActivatedRoute, public baseService: BaseService, private apiService: ApiService,private productService:ProductService) {
    super();
    this.url= environment.link;
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.route.data.pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      data => {
        debugger
        this.brands = data.brands.data;
        this.allProduct= data.allProduct.data;
        this.subCategories = data.subCategories.data;
        this.modelYears = data.modelYears.data;
        this.products = data.products.data;
        this.route.params.pipe(takeUntil(this.ngUnsubscribe)).subscribe(
          (params)=>{
            this.brandParamId = params.id;
            this.brand = this.brands.find(o=>o.id==params.id)           
          }
        )
       
      },
      error => {
        console.log(error);
      }
    );
  }

  ddlBrands_Change(id: string) {
    if(id=="") this.products = this.allProduct;
    else {
      this.productService.findByBrand(id).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
        (products:ApiObjectData)=>{
          this.products  = products.data as Product[]
        }
      )
    }

  }
}
