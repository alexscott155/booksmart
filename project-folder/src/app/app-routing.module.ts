import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';

const routes: Routes = [
  {
    path: 'swipe',
    loadChildren: () => import('./swipe/swipe.module').then( m => m.SwipePageModule)
  },
  {
    path: 'bookshelf',
    loadChildren: () => import('./bookshelf/bookshelf.module').then( m => m.BookshelfPageModule)
  },
  {
    path: 'timer',
    loadChildren: () => import('./timer/timer.module').then( m => m.TimerPageModule)
  },
  {
    path: 'notification',
    loadChildren: () => import('./notification/notification.module').then( m => m.NotificationPageModule)
  },
  {
    path: 'author',
    loadChildren: () => import('./author/author.module').then( m => m.AuthorPageModule)
  },
  {
    path: 'similar-books',
    loadChildren: () => import('./similar-books/similar-books.module').then( m => m.SimilarBooksPageModule)
  },
  {
    path: 'add-notification',
    loadChildren: () => import('./add-notification/add-notification.module').then( m => m.AddNotificationPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: '',
    redirectTo:'/tabs/swipe',
    pathMatch: 'full' 
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'interests',
    loadChildren: () => import('./interests/interests.module').then( m => m.InterestsPageModule)
  },
  {
    path: 'wishlist',
    loadChildren: () => import('./wishlist/wishlist.module').then( m => m.WishlistPageModule)
  },
  // {
  //   path: 'book-detail',
  //   loadChildren: () => import('./book-detail/book-detail.module').then( m => m.BookDetailPageModule)
  // },
  {
    path: 'change-password',
    loadChildren: () => import('./change-password/change-password.module').then( m => m.ChangePasswordPageModule)
  },
  {
    path: 'change-email',
    loadChildren: () => import('./change-email/change-email.module').then( m => m.ChangeEmailPageModule)
  },
  {
    path: 'account-settings',
    loadChildren: () => import('./account-settings/account-settings.module').then( m => m.AccountSettingsPageModule)
  },
  {
    path: 'calendar',
    loadChildren: () => import('./calendar/calendar.module').then( m => m.CalendarPageModule)
  }
  

];
@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
