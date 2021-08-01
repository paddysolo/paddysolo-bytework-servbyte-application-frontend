import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { ContentComponent } from './components/layout/content/content.component';
import { SidebarLeftComponent } from './components/sidebar-left/sidebar-left.component';




@NgModule({
  declarations: [HeaderComponent,ContentComponent,SidebarLeftComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
  ],
  exports: [
    FormsModule,
  ]
})
export class SharedModule { }
