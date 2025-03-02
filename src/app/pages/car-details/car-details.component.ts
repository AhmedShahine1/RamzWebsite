import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/core/models/product';
import { BaseService } from 'src/app/core/services/base/base.service';
import { ProductService } from 'src/app/core/services/products/product.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.scss']
})
export class CarDetailsComponent implements OnInit {
  car: Product | null = null;
  isInsideView: boolean = true; // Toggle between inside and outside view
  currentInsideImage: number = 0;
  currentOutsideImage: number = 0;

  constructor(private carService: ProductService, private router: Router, private route: ActivatedRoute, public baseService: BaseService) { }

  ngOnInit(): void {
    const carId = this.route.snapshot.paramMap.get('id');
    if (carId) {
      this.carService.get(carId).subscribe((car) => {
        this.car = car.data;
      });
    }
  }

  navigateToOrder(type: 'cash' | 'installment') {
    const path = type === 'cash' ? 'order-cash' : 'order-installment';
    this.router.navigate([path]);
  }

  prevImage(isInside: boolean): void {
    if (isInside && this.car?.insideCarImagesUrl.length > 0) {
      this.currentInsideImage = (this.currentInsideImage - 1 + this.car.insideCarImagesUrl.length) % this.car.insideCarImagesUrl.length;
    } else if (!isInside && this.car?.imagesUrl.length > 0) {
      this.currentOutsideImage = (this.currentOutsideImage - 1 + this.car.imagesUrl.length) % this.car.imagesUrl.length;
    }
  }

  nextImage(isInside: boolean): void {
    if (isInside && this.car?.insideCarImagesUrl.length > 0) {
      this.currentInsideImage = (this.currentInsideImage + 1) % this.car.insideCarImagesUrl.length;
    } else if (!isInside && this.car?.imagesUrl.length > 0) {
      this.currentOutsideImage = (this.currentOutsideImage + 1) % this.car.imagesUrl.length;
    }
  }

  setImage(index: number, isInside: boolean): void {
    if (isInside) {
      this.currentInsideImage = index;
    } else {
      this.currentOutsideImage = index;
    }
  }

}