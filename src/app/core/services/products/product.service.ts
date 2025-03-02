import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiObjectData } from '../../models/base/apiObjectData';
import { BaseService } from '../base/base.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  controller = 'Car';

  constructor(private base: BaseService) { }

  get(id: string): Observable<ApiObjectData> {
    return this.base.gets(this.controller + `/car?id=${id}`);
  }

  getAll(): Observable<ApiObjectData> {
    return this.base.gets(this.controller + '/cars');
  }

  gets(): Observable<ApiObjectData> {
    return this.base.gets(this.controller + '/find?size=20');
  }
  search(brandId?: string, catId?: string, minRange?: any, MaxRange?: any): Observable<ApiObjectData> {
    debugger
    if (brandId != null && catId != null)
      return this.base.gets(this.controller + '/search?brandId=' + brandId + '&categoryId=' + catId + '&minPrice=' + minRange + '&maxPrice=' + MaxRange + '&size=20')
    else if (brandId != null && catId == null) {
      return this.base.gets(this.controller + '/search?brandId=' + brandId + '&minPrice=' + minRange + '&maxPrice=' + MaxRange + '&size=20')
    }
    else if (brandId == null && catId == null) {
      return this.base.gets(this.controller + '/search?minPrice=' + minRange + '&maxPrice=' + MaxRange + '&size=20')
    }
  }

  find(brandId?: string, catId?: string, modelId?: string, page?: number, size?: number): Observable<ApiObjectData> {
    return this.base.gets(this.controller + '/Find/' + brandId + '/' + catId + '/' + modelId + '/' + page + '/' + size)
  }

  findByBrand(brancId?: string) {
    return this.base.gets(this.controller + '/CarsByBrand?BrandId=' + brancId);
  }
}
