import { takeUntil } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { faChevronLeft, faPaperPlane, faPhone, faFax, faMessage, faClock, faMapMarker, faPlay, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { BaseComponent } from 'src/app/components/components/base/base.component';
import { Branch } from 'src/app/core/models/branch';
import { ActivatedRoute } from '@angular/router';
import { BaseService } from 'src/app/core/services/base/base.service';
import { ApiService } from 'src/app/core/services/products/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.scss']
})
export class BranchesComponent extends BaseComponent implements OnInit {

  faChevronLeft = faChevronLeft;
  faPaperPlane= faPaperPlane;
  faPhone= faPhone;
  faFax = faFax;
  faMessage = faMessage;
  faClock = faClock;
  faMapMarker = faMapMarker;
  faPlay = faPlay;
  faChevronRight = faChevronRight;
  url:any;
  branches:Branch[]
  constructor(private route: ActivatedRoute, public baseService: BaseService, private apiService: ApiService){
    super();
    this.url= environment.link;
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.route.data.pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      data => {
        this.branches = data.branches.data;

      },
      error => {
        console.log(error);
      }
    );
  }
}
