import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { BrandsComponent } from './pages/brands/brands.component';
import { CarsComponent } from './pages/cars/cars.component';
import { CarDetailesComponent } from './pages/car-detailes/car-detailes.component';
import { FeesComponent } from './pages/fees/fees.component';
import { ServicesComponent } from './pages/services/services.component';
import { CarRequestComponent } from './pages/car-request/car-request.component';
import { BranchesComponent } from './pages/branches/branches.component';
import { ContactComponent } from './pages/contact/contact.component';

import { FeatherModule } from "angular-feather";
import { allIcons } from "angular-feather/icons";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule }   from '@angular/forms';
import { BrandTypesComponent } from './pages/brand-types/brand-types.component';
import { Page404Component } from './pages/page404/page404.component';
import { AboutComponent } from './pages/about/about.component';

import { register } from 'swiper/element/bundle';
import { MainSwipperComponent } from './pages/main-swipper/main-swipper.component';
import { SliderModule } from '@syncfusion/ej2-angular-inputs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {
  HttpClientModule,
  HTTP_INTERCEPTORS,
  HttpClient
} from '@angular/common/http';
import { OrderCashComponent } from './pages/order-cash/order-cash.component';
import { OrderInstallmentComponent } from './pages/order-installment/order-installment.component';
import {PlatformModule} from '@angular/cdk/platform';
import { CarSeaechComponent } from './pages/car-seaech/car-seaech.component';

export function createTranslateLoader(http: HttpClient): any {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

register();

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BrandsComponent,
    CarsComponent,
    CarDetailesComponent,
    FeesComponent,
    ServicesComponent,
    CarRequestComponent,
    BranchesComponent,
    ContactComponent,
    BrandTypesComponent,
    Page404Component,
    AboutComponent,
    MainSwipperComponent,
    OrderCashComponent,
    OrderInstallmentComponent,
    CarSeaechComponent,
  ],
  imports: [
    BrowserModule,
    PlatformModule,
    AppRoutingModule,
    FormsModule,
    ToastrModule.forRoot(),
    FeatherModule.pick(allIcons),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    SliderModule,
    HttpClientModule,
    NgxSliderModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
