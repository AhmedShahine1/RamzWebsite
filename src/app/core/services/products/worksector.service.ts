import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ApiObjectData } from '../../models/base/apiObjectData';
import { BaseService } from '../base/base.service';

@Injectable({
  providedIn: 'root'
})
export class WorksectorService {

  controller = 'WorkSector';

  constructor(private base: BaseService) {}

  get(id: string): Observable<ApiObjectData> {
    return this.base.get(id, this.controller );
  }

  gets(): Observable<ApiObjectData> {
    return this.base.gets(this.controller + '/list');
  }
}
