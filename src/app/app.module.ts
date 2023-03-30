import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { UserFormComponent } from './user-form/user-form.component';

@NgModule({
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, CommonModule],
  declarations: [AppComponent, UserFormComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
