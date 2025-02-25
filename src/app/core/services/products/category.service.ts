import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { ApiObjectData } from '../../models/base/apiObjectData';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  controller = 'Category';

  constructor(private base: BaseService) {}

  get(id: string): Observable<ApiObjectData> {
    return this.base.get(id, this.controller + '/Category');
  }

  gets(): Observable<ApiObjectData> {
    return this.base.gets(this.controller + '/AllCategory');
  }

}
