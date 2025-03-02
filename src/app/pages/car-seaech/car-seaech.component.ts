import { Product } from './../../core/models/product';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faCar, faChevronLeft, faChevronRight, faCoins, faFillDrip } from '@fortawesome/free-solid-svg-icons';
import { takeUntil } from 'rxjs';
import { BaseComponent } from 'src/app/components/components/base/base.component';
import { ApiObjectData } from 'src/app/core/models/base/apiObjectData';
import { Brand } from 'src/app/core/models/brand';
import { Lookup } from 'src/app/core/models/lookup';
import { SubCategory } from 'src/app/core/models/subCategory';
import { BaseService } from 'src/app/core/services/base/base.service';
import { ApiService } from 'src/app/core/services/products/api.service';
import { ProductService } from 'src/app/core/services/products/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-car-seaech',
  templateUrl: './car-seaech.component.html',
  styleUrls: ['./car-seaech.component.scss']
})
export class CarSeaechComponent extends BaseComponent implements OnInit{

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
  searchCount:number=0;
  constructor(private route: ActivatedRoute,    private router: Router,
   public baseService: BaseService, private apiService: ApiService,private productService:ProductService) {
    super();
    this.url= environment.link;
  }

  ngOnInit(): void {
    this.loadData();
  }
  navigateToCarDetails(productId: string) {
    this.router.navigate(['/car-detailes', productId]);
  }
  
  loadData() {
    this.route.queryParams.pipe(takeUntil(this.ngUnsubscribe)).subscribe((params) => {
      const brand = params.brand || null;
      const category = params.category || null;
      const carType = params.carType || null;
      const minPrice = params.minPrice ? Number(params.minPrice) : 0;
      const maxPrice = params.maxPrice ? Number(params.maxPrice):10000000000; // Default to slider max
  
      this.productService
        .search(brand, carType, minPrice, maxPrice)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(
          (data: ApiObjectData) => {
            this.products = data.data;
            this.searchCount = this.products.length;
          },
          (error) => {
            console.error('Error fetching search results:', error);
          }
        );
    });
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
