import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import * as $ from 'jquery';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'sc-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit, AfterViewInit {

  menus: MenuItem[] = [];
  menuIndex: number = 0;

  constructor(private router: Router, private route: ActivatedRoute, private cdr: ChangeDetectorRef) {
    this.menus = [
      { label: 'My Ads', id: 'myads', icon: 'myads' },
      { label: 'User Profile', id: 'profile', icon: 'patient' },
      { label: 'Add Credit', id: 'addcredit', icon: 'wallet' },
      { label: 'Marked Ads', id: 'markedads', icon: 'right' },
      { label: 'Security', id: 'security', icon: 'password' }
    ];
    this.setActiveMenu();
  }

  ngOnInit(): void {
    $('.circle-loader').addClass('load-complete');
    $('.checkmark').toggle();
  }

  ngAfterViewInit(): void {
    $('#menu' + this.menuIndex).addClass('active');
    $('#dash' + this.menuIndex).addClass('dash');
  }

  private setActiveMenu(): void {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        const menu = this.route.snapshot['_routerState'].url.split('/')[2];
        this.menuIndex = this.menus.findIndex(m => m.id === menu);
        this.menuClicked(this.menuIndex);
      }
    });
  }

  menuClicked(i): void {
    $('[id^=menu]').removeClass('active');
    $('#menu' + i).addClass('active');

    $('[id^=dash]').removeClass('dash');
    $('#dash' + i).addClass('dash');
    this.cdr.detectChanges();
  }

}
