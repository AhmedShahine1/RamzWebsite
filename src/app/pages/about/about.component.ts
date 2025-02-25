import { takeUntil } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { BaseComponent } from 'src/app/components/components/base/base.component';
import { BaseService } from 'src/app/core/services/base/base.service';
import { environment } from 'src/environments/environment';
import { Brand } from 'src/app/core/models/brand';
import { Platform } from '@angular/cdk/platform';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent extends BaseComponent implements OnInit {

  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;

  url: any;
  lang: string;
  brands: Brand[];

  constructor (
    private route: ActivatedRoute,
    public baseService: BaseService,
    private platform: Platform
    ) 
  {
    super();
    this.url = environment.link;
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.route.data.pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      data => {
        this.brands = data.brands.data;
      },
      error => {
        console.log(error);
      }
    );
  }

  downloadApp() {
    if (this.platform.IOS || this.platform.SAFARI)
    {
      window.open("https://apps.apple.com/pk/app/%D8%B1%D9%85%D8%B2-%D8%A7%D9%84%D8%A7%D8%AE%D8%AA%D9%8A%D8%A7%D8%B1-%D9%84%D9%84%D8%B3%D9%8A%D8%A7%D8%B1%D8%A7%D8%AA/id1571358791");
    }
    else{
      window.open("https://play.google.com/store/apps/details?id=com.ramzelkhtear.ramzapp");
    }
  }
  
}
