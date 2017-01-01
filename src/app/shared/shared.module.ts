import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    NgbModule.forRoot()
  ],
  exports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    NgbModule,
  ]
})
export class SharedModule { }
