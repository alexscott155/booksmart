import {Component, OnInit} from '@angular/core';
import { Plugins } from '@capacitor/core';
const { SplashScreen } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit{
  public currentPageIndex = 0;
  public menuPages = [
    
    {
      title: 'Home',
      url: '/tabs/swipe',
      icon: 'home'
    },
    {
      title: 'Settings',
      url: '/settings',
      icon: 'settings'
    },
    {
      title: 'Notification',
      url: '/notification',
      icon: 'notifications'
    },
    {
      title: 'Bookshelf',
      url: '/bookshelf',
      icon: 'albums'
    }
  ];
  constructor() {
    this.initializeApp();
  }

  initializeApp() {
    SplashScreen.hide();
  }

  ngOnInit() {
    const path = window.location.pathname.split('/')[1];
    if (path !== undefined) {
      this.currentPageIndex = this.menuPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }
}