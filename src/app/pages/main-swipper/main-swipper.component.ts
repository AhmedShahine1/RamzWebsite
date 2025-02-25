import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs';
import { BaseComponent } from 'src/app/components/components/base/base.component';
import { ApiObjectData } from 'src/app/core/models/base/apiObjectData';
import { ProductImage } from 'src/app/core/models/productImage';
import { Promotion } from 'src/app/core/models/promotion';
import { BaseService } from 'src/app/core/services/base/base.service';
import { PromotionService } from 'src/app/core/services/products/promotion.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-main-swipper',
  templateUrl: './main-swipper.component.html',
  styleUrls: ['./main-swipper.component.scss']
})
export class MainSwipperComponent extends BaseComponent implements OnInit {
  productImage:ProductImage[]
  promotions :Promotion[];
  url:any;
  constructor( public baseService:BaseService,
    private promotionService:PromotionService){
    super();
    this.url= environment.link;
  }
  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.promotionService.getPromotions().pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      (data:ApiObjectData)=>{
        this.promotions=data.data;
      }
    )
  }
}
