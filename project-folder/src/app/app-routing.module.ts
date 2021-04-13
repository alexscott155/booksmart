import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
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
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
