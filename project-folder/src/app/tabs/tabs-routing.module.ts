import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'swipe',
        loadChildren: () => import('../swipe/swipe.module').then(m => m.SwipePageModule)
      },
      {
        path: 'timer',
        loadChildren: () => import('../timer/timer.module').then(m => m.TimerPageModule)
      },
      {
        path: 'book-detail',
        loadChildren: () => import('../book-detail/book-detail.module').then( m => m.BookDetailPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/swipe',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/swipe',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
