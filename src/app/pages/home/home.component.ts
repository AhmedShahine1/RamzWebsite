import { Component, OnInit, ViewChild } from '@angular/core';
import {
  faCoins,
  faCar,
  faChevronLeft,
  faPaperPlane,
  faChevronDown,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import { NgForm } from '@angular/forms';
import { Options, LabelType } from '@angular-slider/ngx-slider';
import { TranslateService } from '@ngx-translate/core';
import { BaseComponent } from 'src/app/components/components/base/base.component';
import { PromotionService } from 'src/app/core/services/products/promotion.service';
import { BaseService } from 'src/app/core/services/base/base.service';
import { environment } from 'src/environments/environment';
import { ApiObjectData } from 'src/app/core/models/base/apiObjectData';
import { takeUntil } from 'rxjs';
import { Promotion } from 'src/app/core/models/promotion';
import { ProductImage } from 'src/app/core/models/productImage';
import { Order } from 'src/app/core/models/order';
import { Lookup } from 'src/app/core/models/lookup';
import { City } from 'src/app/core/models/city';
import { SubCategory } from 'src/app/core/models/subCategory';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/products/api.service';
import { Brand } from 'src/app/core/models/brand';
import { Platform } from '@angular/cdk/platform';
import { Product } from 'src/app/core/models/product';
import { ProductService } from 'src/app/core/services/products/product.service';
import { CategoryService } from 'src/app/core/services/products/category.service';
import { Category } from 'src/app/core/models/category';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent extends BaseComponent implements OnInit {
  @ViewChild('carSearch', { static: false }) carSearch: NgForm | undefined;

  faCoins = faCoins;
  faCar = faCar;
  faChevronDown = faChevronDown;
  faSearch = faSearch;

  value: number = 0;
  highValue: number = 1000000;
  options: Options = {
    floor: 0,
    ceil: 1000000,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return value + ' ريال';
        case LabelType.High:
          return value + ' ريال';
        default:
          return value + ' ريال';
      }
    },
  };

  order = {} as Order;
  regions: Lookup[];
  cities: City[];
  citiesDataSource: City[];
  brands: Brand[];
  brand = {} as Brand;
  subCategories: SubCategory[];
  subCategoriesDataSource: Category[];
  subCategory = {} as SubCategory;
  modelYears: Lookup[];
  url: any;
  lang: string;
  products: Product[] = [];
  selectedCategory: string = '';
  selectedCarType: string = '';
  selectedBrand: string = '';

  constructor(
    private route: ActivatedRoute,
    public baseService: BaseService,
    private categoryService: CategoryService,
    private productService: ProductService,
    private platform: Platform,
    private router: Router
  ) {
    super();
    this.url = environment.link;
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.lang = localStorage.getItem('lang');

    this.route.data.pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      (data) => {
        this.brands = data.brands.data; // Load brands
        this.subCategories = data.subCategories.data; // Load categories

      },
      (error) => {
        console.error('Error loading data', error);
      }
    );
    this.categoryService.gets().subscribe(
      (response) => {
        this.subCategoriesDataSource = response.data; // Load products
      },
      (error) => {
        console.error('Error fetching products', error);
      }
    );
    this.productService.getAll().subscribe(
      (response) => {
        this.products = response.data; // Load products
      },
      (error) => {
        console.error('Error fetching products', error);
      }
    );
  }

  search() {
    const brandId = this.selectedBrand || null;
    const categoryId = this.selectedCategory || null;
    const modelId = this.selectedCarType || null;
    const page = 1; // Default page
    const size = 10; // Default page size
  
    this.productService.find(brandId, categoryId, modelId, page, size).subscribe(
      (response) => {
        if (response.status) {
          this.products = response.data; // Update the Cars list with search results
        } else {
          Swal.fire({
            icon: 'error',
            title: 'خطأ',
            text: response.ErrorMessage || 'لم يتم العثور على نتائج',
          });
        }
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'خطأ',
          text: 'حدث خطأ أثناء البحث عن السيارات',
        });
        console.error(error);
      }
    );
  }
  
  navigateToCarDetails(productId: string) {
    this.router.navigate(['/car-detailes', productId]);
  }
  downloadApp() {
    if (this.platform.IOS || this.platform.SAFARI) {
      window.open("https://apps.apple.com/pk/app/%D8%B1%D9%85%D8%B2-%D8%A7%D9%84%D8%A7%D8%AE%D8%AA%D9%8A%D8%A7%D8%B1-%D9%84%D9%84%D8%B3%D9%8A%D8%A7%D8%B1%D8%A7%D8%AA/id1571358791");
    }
    else {
      window.open("https://play.google.com/store/apps/details?id=com.ramzelkhtear.ramzapp");
    }
  }

  public toggleSections(e: { target: any }) {
    let offerLinksArr = Array.from(document.querySelectorAll('.offer-tab'));
    let clickedLink = e.target;

    for (let link of offerLinksArr) {
      if (link.innerHTML === clickedLink.innerHTML) {
        link.classList.add('offer-tab-active');
      } else {
        link.classList.remove('offer-tab-active');
      }
    }
  }
}
