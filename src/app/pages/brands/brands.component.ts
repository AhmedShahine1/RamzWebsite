import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faChevronLeft, faPaperPlane, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { takeUntil } from 'rxjs';
import { BaseComponent } from 'src/app/components/components/base/base.component';
import { Brand } from 'src/app/core/models/brand';
import { BaseService } from 'src/app/core/services/base/base.service';
import { ApiService } from 'src/app/core/services/products/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent extends BaseComponent implements OnInit{
  brands: Brand[];
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  url:any;

  constructor(private route: ActivatedRoute, public baseService: BaseService, private apiService: ApiService) {
    super();
    this.url= environment.link;
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.route.data.pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      data => {
        this.brands = data.brands.data;
      },
      error => {
        console.log(error);
      }
    );
  }
}
