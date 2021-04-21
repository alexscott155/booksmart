import {Component, OnInit} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
const { SplashScreen } = Plugins;
import { MenuController } from '@ionic/angular'; 
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
  constructor(private router: Router, private menuCtrl: MenuController, private auth: AngularFireAuth) {
    this.initializeApp();
  }

  initializeApp() {
    SplashScreen.hide();
  }

  async logout(){
    this.menuCtrl.toggle();
    // logging out
    await this.auth.signOut().then(() => {
    });
    this.router.navigate([''])
  }

  ngOnInit() {
    const path = window.location.pathname.split('/')[1];
    if (path !== undefined) {
      this.currentPageIndex = this.menuPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }
}