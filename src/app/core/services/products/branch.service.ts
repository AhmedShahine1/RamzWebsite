import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { ApiObjectData } from '../../models/base/apiObjectData';

@Injectable({
  providedIn: 'root'
})
export class BranchService {
  controller = 'Branch';

  constructor(private base: BaseService) {}

  get(id: string): Observable<ApiObjectData> {
    return this.base.get(id, this.controller );
  }

  gets(): Observable<ApiObjectData> {
    return this.base.gets(this.controller + '/GetBranches');
  }
}
