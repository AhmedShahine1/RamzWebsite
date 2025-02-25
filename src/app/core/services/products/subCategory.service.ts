import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiObjectData } from '../../models/base/apiObjectData';
import { BaseService } from '../base/base.service';
import { SubCategory } from '../../models/subCategory';

@Injectable({
  providedIn: 'root'
})
export class SubCategoryService {

  controller = 'SubCategory';

  constructor(private base: BaseService) {}

  get(id: string): Observable<ApiObjectData> {
    return this.base.get(id, this.controller  + '/SubCategory');
  }

  gets(): Observable<ApiObjectData> {
    return this.base.gets(this.controller + '/AllSubCategories');
  }

  save(model: SubCategory) {
    return this.base.save(this.controller, model);
  }

  remove(id: number) {
    return this.base.remove(this.controller, id);
  }

}
