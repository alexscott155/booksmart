import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StreakPage } from './streak.page';

const routes: Routes = [
  {
    path: '',
    component: StreakPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StreakPageRoutingModule {}
