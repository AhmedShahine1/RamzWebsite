import { Component } from '@angular/core';
import { faCoins, faCar, faChevronLeft, faPaperPlane, faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent {

  faChevronDown = faChevronDown;
  faChevronLeft= faChevronLeft;
  faChevronRight = faChevronRight;

}
