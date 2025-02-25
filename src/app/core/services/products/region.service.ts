import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../base/base.service';
import { ApiObjectData } from '../../models/base/apiObjectData';

@Injectable({
  providedIn: 'root'
})
export class RegionService {

  controller = 'Region';

  constructor(private base: BaseService) {}

  get(id: string): Observable<ApiObjectData> {
    return this.base.get(id, this.controller );
  }

  gets(): Observable<ApiObjectData> {
    return this.base.gets(this.controller + '/list');
  }

}
