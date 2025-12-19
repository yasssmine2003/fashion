import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Core Module
import { CoreModule } from './core/core.module';

// Shared Module
import { SharedModule } from './shared/shared.module';

// NGX-Toastr
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule, // IMPORTANT : Pour les requêtes HTTP
    AppRoutingModule,
    
    // Core Module (Guards, Interceptors, Services)
    CoreModule,
    
    // Shared Module (Header, Footer, Components)
    SharedModule,
    
    // NGX-Toastr Configuration
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      progressBar: true,
      closeButton: true,
      enableHtml: true,
      tapToDismiss: true,
      newestOnTop: true
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }