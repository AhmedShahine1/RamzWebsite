import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AlertService } from './alert.service';
import { catchError } from 'rxjs/operators';
// import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
// import { AuthService } from 'app/shared/Account/auth.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ApiObjectData } from '../../models/base/apiObjectData';
import { environment } from 'src/environments/environment';
// import { AuthService } from '../sc/auth.service';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  @BlockUI() blockUI: NgBlockUI;
  isRTL: boolean;
  dir: string;
  lang: string;
  userId: number;
  baseUrl = environment.apiUrl+'/api/';
  appUrl = environment.apiUrl;
  url = environment.url;
  headerSender:any;
  constructor(
    private http: HttpClient,
    private router: Router,
    private alertService: AlertService,
    // private authService: AuthService
  ) {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIxIiwidW5pcXVlX25hbWUiOiJLaGFsaWwiLCJuYmYiOjE2OTQ2ODc3NzcsImV4cCI6MTY5NDc3NDE3NywiaWF0IjoxNjk0Njg3Nzc3fQ.dYNU-6Ov47LxRvyWiI5age8MdoaogJ0L-QeLK0Zd0EXzaqwl4JE1n2ndyGk-RJUBmXobWq_FwZiNVTnGHZylNg'}`
    })
    this.headerSender = headers
   }

  get(id: string, controller: string): Observable<ApiObjectData> {
    return this.http.get<ApiObjectData>(this.baseUrl + controller + '/' + id,{headers:this.headerSender});
  }

  gets(controller: string): Observable<ApiObjectData> {
    return this.http.get<ApiObjectData>(this.baseUrl + controller,{headers:this.headerSender});
  }

  save(controller: string, model: any) {
    return this.http.post(this.baseUrl + controller + '/', model,{headers:this.headerSender});
  }

  saveBatch(controller: string, model: any) {
    return this.http.post(this.baseUrl + controller + '/', model,{headers:this.headerSender});
  }

  remove(controller: string, id: number) {
    return this.http.delete(this.baseUrl + controller + '/remove/' + id,{headers:this.headerSender});
  }

  delete(controller: string, id: number) {
    return this.http.delete(this.baseUrl + controller + '/delete/' + id);
  }

  getByUser(id: number, controller: string): Observable<ApiObjectData> {
    return this.http.get<ApiObjectData>(
      this.baseUrl + controller + '/GetUserMenu/' + id
    );
  }

  post(controller: string, operation: string, model: any) {
    return this.http.post(this.baseUrl + controller + '/' + operation, model);
  }

  postFile(controller: string, operation: string, fileToUpload: File) {
    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    return this.http.post(this.baseUrl + controller + '/' + operation, formData);
  }

  find(searchText: string, controller: string): Observable<ApiObjectData> {
    return this.http.get<ApiObjectData>(
      this.baseUrl + controller + '/find/' + searchText
    );
  }

  observ(observ: any): Observable<ApiObjectData> {
    return observ.pipe(
      catchError(error => {
        this.alertService.error(
          'حدث خطأ غير متوقع يرجي إعادة المحاولة أو مراجعة مسؤول النظام'
        );
        console.log(error);
        this.router.navigate(['']);
        return of(null);
      })
    );
  }

  observnav(observ: any, commands: any[]): Observable<ApiObjectData> {
    return observ.pipe(
      catchError(error => {
        this.alertService.error(
          'حدث خطأ غير متوقع يرجي إعادة المحاولة أو مراجعة مسؤول النظام'
        );
        console.log(error);
        this.router.navigate(commands);
        return of(null);
      })
    );
  }

  resolveGet(
    service: any,
    route: ActivatedRouteSnapshot,
    url: string
  ): Observable<ApiObjectData> {
    if (route.params.type === 'edit') {
      return this.observnav(service.get(route.params.id), [
        url,
        route.params.id
      ]);
    } else {
      return of(null) as any;
    }
  }

  resolveGets(service: any): Observable<ApiObjectData> {
    return this.observ(service.gets());
  }

  resolveOperation(operation: any): Observable<ApiObjectData> {
    return this.observ(operation);
  }

  blockStart() {
    this.blockUI.start();
    if (this.isRTL) {
      this.blockUI.start('تحميل البيانات');
    } else {
      this.blockUI.start('Loading Data');
    }
  }

  blockStartMsg(msg: string) {
    this.blockUI.start(msg);
  }

  blockStop() {
    this.blockUI.stop();
  }

  // convetDateToString(value: NgbDateStruct): string {
  //   let result = '';
  //   if (value && value.day != null) {
  //     result += value.year.toString();
  //     result += '/';
  //     if (value.month.toString().length === 1) {
  //       result += '0' + value.month.toString();
  //     } else {
  //       result += value.month.toString();
  //     }
  //     result += '/';
  //     if (value.day.toString().length === 1) {
  //       result += '0' + value.day.toString();
  //     } else {
  //       result += value.day.toString();
  //     }
  //     return result;
  //   }
  //   return '';
  // }

  // convetStringToDate(value: string): NgbDateStruct {
  //   if (value) {
  //     let dateParts = value
  //       .substr(0, 10)
  //       .trim()
  //       .split('-');
  //     if (dateParts.length === 3) {
  //       if (dateParts[0].length === 4) {
  //         return {
  //           year: Number(dateParts[0]),
  //           month: Number(dateParts[1]),
  //           day: Number(dateParts[2])
  //         };
  //       } else if (dateParts[2].length === 4) {
  //         return {
  //           day: Number(dateParts[0]),
  //           month: Number(dateParts[1]),
  //           year: Number(dateParts[2])
  //         };
  //       }
  //     }
  //     dateParts = value
  //       .substr(0, 10)
  //       .trim()
  //       .split('/');
  //     if (dateParts.length === 3) {
  //       if (dateParts[0].length === 4) {
  //         return {
  //           year: Number(dateParts[0]),
  //           month: Number(dateParts[1]),
  //           day: Number(dateParts[2])
  //         };
  //       } else if (dateParts[2].length === 4) {
  //         return {
  //           day: Number(dateParts[0]),
  //           month: Number(dateParts[1]),
  //           year: Number(dateParts[2])
  //         };
  //       }
  //     }
  //   }
  //   return null;
  // }
}
