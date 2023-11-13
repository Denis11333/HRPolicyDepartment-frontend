import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  currentUrl: string;

  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  constructor(private router: Router, private toastr: ToastrService) {
    this.currentUrl = this.router.url;

    router.events.subscribe(() => {
      this.closeMenu()
    });
  }

  ngOnInit() {
    this.router.events.subscribe(() => {
      this.currentUrl = this.router.url;
    });
  }

  isActive(url: string): boolean {
    return this.currentUrl === url;
  }

  unAuthorize(){
    localStorage.removeItem('token')
    this.toastr.info('Ви вдало вийшли з акаунту')
  }

  protected readonly localStorage = localStorage;
}
