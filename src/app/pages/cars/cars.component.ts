import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faChevronLeft, faCoins, faCar, faFillDrip, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { takeUntil } from 'rxjs';
import { BaseComponent } from 'src/app/components/components/base/base.component';
import { Brand } from 'src/app/core/models/brand';
import { Lookup } from 'src/app/core/models/lookup';
import { Product } from 'src/app/core/models/product';
import { SubCategory } from 'src/app/core/models/subCategory';
import { BaseService } from 'src/app/core/services/base/base.service';
import { ProductService } from 'src/app/core/services/products/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss']
})
export class CarsComponent extends BaseComponent implements OnInit {
  faChevronLeft = faChevronLeft;
  faCoins = faCoins;
  faCar = faCar;
  faFillDrip = faFillDrip;
  faChevronRight = faChevronRight;

  brands: Brand[] = [];
  subCategories: SubCategory[] = [];
  brand: Brand = {} as Brand;
  modelYears: Lookup[] = [];
  products: Product[] = [];
  allProducts: Product[] = [];
  brandParamId: any;
  url: string = environment.link;

  // Search & filter criteria
  selectedBrandId: string = "";
  selectedSubCategoryId: string = "";
  priceFrom: number | null = null;
  priceTo: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public baseService: BaseService,
    private productService: ProductService
  ) {
    super();
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.route.data.pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      (data) => {
        this.brands = data.brands.data;
        this.subCategories = data.subCategories.data;
        this.allProducts = data.products.data;
        this.products = [...this.allProducts]; // Copy all products initially
        this.modelYears = data.modelYears.data;

        this.route.params.pipe(takeUntil(this.ngUnsubscribe)).subscribe((params) => {
          this.brandParamId = params['id'];
          this.brand = this.brands.find((b) => b.id == this.brandParamId) || {} as Brand;
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }

  onSearchClick() {
    this.productService.search(this.selectedBrandId, this.selectedSubCategoryId, this.priceFrom, this.priceTo)
      .subscribe((response) => {
        if (response && response.status) {
          this.products = response.data; // Update the product list with the API response
        } else {
          this.products = []; // No results found
        }
      }, (error) => {
        console.error("Error fetching search results:", error);
        this.products = []; // Handle errors by clearing the list
      });
  }
  

  navigateToCarDetails(productId: string) {
    this.router.navigate(['/car-detailes', productId]);
  }
}
