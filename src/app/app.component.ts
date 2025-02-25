import { BaseService } from 'src/app/core/services/base/base.service';
import { DOCUMENT } from '@angular/common';
import {
  Component,
  HostListener,
  Inject,
  OnInit,
  Renderer2,
} from '@angular/core';
import {
  faCoins,
  faCar,
  faChevronLeft,
  faPaperPlane,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';

import { Router } from '@angular/router';
import { Platform } from '@angular/cdk/platform';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'RamzElekhtearCars';

  faCoins = faCoins;
  faCar = faCar;
  faChevronLeft = faChevronLeft;
  faPaperPlane = faPaperPlane;
  faChevronRight = faChevronRight;

  dir = true;

  // appnavstat: boolean = false;

  // @HostListener('window:scroll', ['$event']) onscroll() {
  //   if(window.scrollY > 150) {
  //     this.appnavstat = true
  //   }
  //   else {this.appnavstat = false}
  // }

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private translate: TranslateService,
    private renderer: Renderer2,
    public baseService: BaseService,
    private router: Router,
    private platform: Platform
  ) {
    translate.setDefaultLang('ar');
  }

  ngOnInit(): void {
    if (localStorage.getItem('dir')) {
      this.baseService.dir = localStorage.getItem('dir');
      this.baseService.lang = localStorage.getItem('lang');
      this.baseService.isRTL =
        localStorage.getItem('dir') === 'rtl' ? true : false;
    } else {
      this.baseService.dir = 'rtl';
      this.baseService.lang = 'ar';
      this.baseService.isRTL = true;
      localStorage.setItem('dir', this.baseService.dir);
      localStorage.setItem('lang', this.baseService.lang);
    }
    document
      .getElementsByTagName('html')[0]
      .setAttribute('dir', this.baseService.dir);
    this.renderer.addClass(this.document.body, this.baseService.dir);
    this.translate.use(this.baseService.lang);
  }

  public getmenu() {
    const menu = document.querySelector('#mobile-menu');
    const menuLinks = document.querySelector('.mobile-navigation-menu');
    if (menu && menuLinks) {
      // menu.addEventListener('click', function () {
      menu.classList.toggle('is-active');
      menuLinks.classList.toggle('active');
      // });
    }
  }

  home() {
    this.closeSidebar();
    this.router.navigate(['/home']);
  }

  about() {
    this.closeSidebar();
    this.router.navigate(['/about']);
  }

  brands() {
    this.closeSidebar();
    this.router.navigate(['/brands']);
  }
  branches() {
    this.closeSidebar();
    this.router.navigate(['/branches']);
  }
  services() {
    this.closeSidebar();
    this.router.navigate(['/services']);
  }
  contact() {
    this.closeSidebar();
    this.router.navigate(['/contact']);
  }

  calculate() {
    this.closeSidebar();
    this.router.navigate(['/calculate']);
  }

  carRequest() {
    this.closeSidebar();
    this.router.navigate(['/car-request']);
  }

  closeMenu() {
    const menuClose = document.querySelector('.menu-close-btn');
    const menu = document.querySelector('#mobile-menu');
    const menuLinks = document.querySelector('.mobile-navigation-menu');
    if (menuClose && menuLinks && menu) {
      menuClose.addEventListener('click', function () {
        menuLinks.classList.remove('active');
        menu.classList.remove('is-active');
      });
    }
  }

  toTop() {
    window.scroll(0, 0);
  }

  onActive() {
    window.scroll(0, 0);
  }

  changeLangEN() {
    document.getElementsByTagName('html')[0].setAttribute('dir', 'ltr');
    this.renderer.addClass(this.document.body, 'ltr');
    this.baseService.isRTL = false;
    localStorage.setItem('lang', 'en');
    localStorage.setItem('dir', 'ltr');
    this.baseService.lang = 'en';
    this.translate.use('en');
    this.dir = false;
  }

  changeLangAR() {
    document.getElementsByTagName('html')[0].setAttribute('dir', 'rtl');
    this.renderer.addClass(this.document.body, 'rtl');
    this.baseService.isRTL = true;
    localStorage.setItem('lang', 'ar');
    localStorage.setItem('dir', 'rtl');
    this.baseService.lang = 'ar';
    this.translate.use('ar');
    this.dir = true;
  }

  closeSidebar() {
    const menu = document.querySelector('#mobile-menu');
    const menuLinks = document.querySelector('.mobile-navigation-menu');
    menuLinks.classList.remove('active');
    menu.classList.remove('is-active');
  }

  downloadApp() {
    if (this.platform.IOS || this.platform.SAFARI) {
      window.open(
        'https://apps.apple.com/pk/app/%D8%B1%D9%85%D8%B2-%D8%A7%D9%84%D8%A7%D8%AE%D8%AA%D9%8A%D8%A7%D8%B1-%D9%84%D9%84%D8%B3%D9%8A%D8%A7%D8%B1%D8%A7%D8%AA/id1571358791'
      );
    } else {
      window.open(
        'https://play.google.com/store/apps/details?id=com.ramzelkhtear.ramzapp'
      );
    }
  }
}
