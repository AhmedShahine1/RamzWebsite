import { Component } from '@angular/core';
import { faChevronLeft, faPaperPlane, faChevronRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-brand-types',
  templateUrl: './brand-types.component.html',
  styleUrls: ['./brand-types.component.scss']
})
export class BrandTypesComponent {

  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
}
