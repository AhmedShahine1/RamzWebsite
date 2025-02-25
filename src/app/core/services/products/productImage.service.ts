import { Injectable } from '@angular/core';
import { ApiObjectData } from '../../models/base/apiObjectData';
import { BaseService } from '../base/base.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductImageService {

  controller = 'ProductImage';

  constructor(private base: BaseService) { }

  get(id: number): Observable<ApiObjectData> {
    return this.base.get(id, this.controller);
  }

  gets(): Observable<ApiObjectData> {
    return this.base.gets(this.controller);
  }

 
}
