import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StreakPageRoutingModule } from './streak-routing.module';

import { StreakPage } from './streak.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StreakPageRoutingModule
  ],
  declarations: [StreakPage]
})
export class StreakPageModule {}
