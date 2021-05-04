import {Component, OnInit} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
const { SplashScreen } = Plugins;
import { MenuController, Platform } from '@ionic/angular'; 
import { BackgroundMode } from '@ionic-native/background-mode/ngx';

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
    },
    {
      title: 'Calendar',
      url: '/calendar',
      icon: 'calendar'
    }
  ];
  constructor(private platform: Platform ,private router: Router, private menuCtrl: MenuController,
     private auth: AngularFireAuth, private backgroundMode: BackgroundMode
     ) {

      this.checkUser()
      this.initializeApp();
      // enable background mode to allow for local notification to work
      this.backgroundMode.enable();
  }
  
  async checkUser(){
    this.platform.ready().then(async () => {
      let isLoggedIn = localStorage.getItem('loggedin')
      console.log(isLoggedIn)
        if(isLoggedIn == "true") {
          this.router.navigateByUrl('tabs', {replaceUrl:true})
        } else {
          this.router.navigateByUrl('login', {replaceUrl:true})
        }
    })
  }

  async initializeApp() {
     
    SplashScreen.hide();
  }

  async logout(){
    this.menuCtrl.toggle();
    // logging out
    await this.auth.signOut().then(() => {
      localStorage.setItem('loggedin', 'false')
      localStorage.setItem('uid', undefined)
      // disable background mode because nothing should be running if logged out.
      this.backgroundMode.disable();
      window.location.reload()
    });
    this.router.navigate(['login'])

  }

  ngOnInit() {
    
    const path = window.location.pathname.split('/')[1];
    if (path !== undefined) {
      this.currentPageIndex = this.menuPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }
}