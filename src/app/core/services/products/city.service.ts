import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiObjectData } from '../../models/base/apiObjectData';
import { BaseService } from '../base/base.service';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  controller = 'City';

  constructor(private base: BaseService) { }

  get(id: string): Observable<ApiObjectData> {
    return this.base.get(id, this.controller + '/City');
  }

  gets(): Observable<ApiObjectData> {
    return this.base.gets(this.controller + '/Cities');
  }
}
