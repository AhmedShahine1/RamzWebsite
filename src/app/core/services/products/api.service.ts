import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../base/base.service';
import { ContactMessage } from '../../models/contactMessage';
import { Order } from '../../models/order';
import { Calculate } from '../../models/calculate';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private base: BaseService) { }

  saveContactMessage(model: ContactMessage) {
    return this.base.save('contactmessage', model);
  }

  saveOrder(id: number, model: Order) {
    return this.base.save('order/' + id, model);
  }

  calculate(model: Calculate) {
    return this.base.save('FinancingOption/Calculate', model);
  }

  getPromotions() {
    return this.base.gets('promotion/list');
  }



}
