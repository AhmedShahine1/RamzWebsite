import { BrandsComponent } from './pages/brands/brands.component';
import { BrandTypesComponent } from './pages/brand-types/brand-types.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BranchesComponent } from './pages/branches/branches.component';
import { ContactComponent } from './pages/contact/contact.component';
import { CarRequestComponent } from './pages/car-request/car-request.component';
import { FeesComponent } from './pages/fees/fees.component';
import { Page404Component } from './pages/page404/page404.component';
import { CarDetailesComponent } from './pages/car-detailes/car-detailes.component';
import { CarsComponent } from './pages/cars/cars.component';
import { AboutComponent } from './pages/about/about.component';
import { ServicesComponent } from './pages/services/services.component';
import { BrandsResolver, ModelYearsResolver } from './core/resolvers/brand.resolver';
import { AllProductsResolver, BanksResolver, CitiesResolver, ProductResolver, ProductsByBrandResolver, ProductsBySearchResolver, ProductsResolver, RegionsResolver, SubCategoriesResolver, WorkSectorsResolver } from './core/resolvers/resolvers.resolver';
import { BranchesResolver } from './core/resolvers/branch.resolver';
import { OrderCashComponent } from './pages/order-cash/order-cash.component';
import { OrderInstallmentComponent } from './pages/order-installment/order-installment.component';
import { CarSeaechComponent } from './pages/car-seaech/car-seaech.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    resolve: {
      brands: BrandsResolver,
      subCategories: SubCategoriesResolver
    }
  },
  {
    path: "home",
    component: HomeComponent,
    resolve: {
      brands: BrandsResolver,
      subCategories: SubCategoriesResolver
    }
  },
  {
    path: "about",
    component: AboutComponent,
    resolve: {
      brands: BrandsResolver,
    }
  },
  {
    path: "contact",
    component: ContactComponent
  },
  {
    path: "branches",
    component: BranchesComponent,
    resolve: {
      branches: BranchesResolver
    }
  },
  {
    path: "car-request",
    component: CarRequestComponent,
    resolve: {
      brands: BrandsResolver,
      cities: CitiesResolver,
      modelYears: ModelYearsResolver,
      subCategories: SubCategoriesResolver,
    }
  },
  {
    path: "brand-types",
    component: BrandTypesComponent
  },
  {
    path: "brands",
    component: BrandsComponent,
    resolve: {
      brands: BrandsResolver
    }
  },
  {
    path: "calculate",
    component: FeesComponent,
    resolve: {
      regions: RegionsResolver,
      cities: CitiesResolver,
      banks: BanksResolver,
      workSectors: WorkSectorsResolver
    }
  },
  {
    path: "car-detailes/:id",
    component: CarDetailesComponent,
    resolve: {
      product: ProductResolver,
      brands: BrandsResolver
    }
  },
  {
    path: "cars/:id",
    component: CarsComponent,
    resolve: {
      brands: BrandsResolver,
      subCategories: SubCategoriesResolver,
      modelYears: ModelYearsResolver,
      products: ProductsByBrandResolver,
      allProduct: AllProductsResolver
    }
  },
  {
    path: "services",
    component: ServicesComponent
  },
  {
    path: 'order-cash',
    component: OrderCashComponent,
    resolve: {
      regions: RegionsResolver,
      cities: CitiesResolver
    }
  },
  {
    path: 'order-installment',
    component: OrderInstallmentComponent,
    resolve: {
      regions: RegionsResolver,
      cities: CitiesResolver,
      banks: BanksResolver,
      workSectors: WorkSectorsResolver
    }
  },
  {
    path:'search-cars',
    component: CarSeaechComponent,
    resolve:{
    }
  },
  { path: '**', component: Page404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
