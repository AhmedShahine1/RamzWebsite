import { Specification } from './../../core/models/specification';
import { Product } from 'src/app/core/models/product';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { faChevronLeft, faPaperPlane, faCoins, faCar, faBrush, faFillDrip, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { DOCUMENT } from '@angular/common';
import { BaseComponent } from 'src/app/components/components/base/base.component';
import { ActivatedRoute } from '@angular/router';
import { BaseService } from 'src/app/core/services/base/base.service';
import { ApiService } from 'src/app/core/services/products/api.service';
import { ProductService } from 'src/app/core/services/products/product.service';
import { environment } from 'src/environments/environment';
import { takeUntil } from 'rxjs';
import { Brand } from 'src/app/core/models/brand';



@Component({
  selector: 'app-car-detailes',
  templateUrl: './car-detailes.component.html',
  styleUrls: ['./car-detailes.component.scss']
})
export class CarDetailesComponent extends BaseComponent implements OnInit{
  // @ViewChild('MainImage', { read: ElementRef }) MainImage:ElementRef | any;
  // @ViewChild('MainImage') MainImage: ElementRef<HTMLElement> | any;
  // @ViewChild('MainImage', { static: true }) MainImage: any;
  
  faChevronLeft = faChevronLeft;
  faCoins= faCoins;
  faCar = faCar;
  faFillDrip = faFillDrip;
  faChevronRight = faChevronRight;

  MainSrc: any;
  smallSrc: any;

  imagesrc: any
  url:any;
  product:Product[];
  brands: Brand[];
  brand={} as Brand;
  spec1:Specification[];
  spec2:Specification[];
  constructor(private route: ActivatedRoute, public baseService: BaseService, private apiService: ApiService) {
    super();
    this.url= environment.link;
  }

  ngOnInit(): void {
    this.loadData();
    this.imagesrc =this.url+'/'+ this.product[0]?.imageUrl
  }

  loadData(){
    this.route.data.pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      data => {
        this.product = data.product.data;
        this.brands = data.brands.data;
        this.brand = this.brands.find(o=>o.id== this.product[0]?.brand.id)
        let sp1= this.product[0]?.specifications.length%2===0;
        debugger
        if(sp1){
          let half = this.product[0]?.specifications.length / 2;
         this.spec1 = this.product[0]?.specifications.splice(0, half);
          this.spec2 = this.product[0]?.specifications ;
        }else{
          let half = (this.product[0]?.specifications.length-1)/2;
          this.spec1  = this.product[0]?.specifications.splice(0, half);
          this.spec2 = this.product[0]?.specifications ;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  getSRC(e: any) {
    this.imagesrc = e.srcElement.currentSrc;
  }
}
