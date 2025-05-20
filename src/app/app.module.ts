import { NgModule }                         from '@angular/core';
import { BrowserModule }                    from '@angular/platform-browser';
import { RouteReuseStrategy }               from '@angular/router';
import { IonicModule, IonicRouteStrategy }  from '@ionic/angular';
import { IonicStorageModule }               from '@ionic/storage-angular';    // ← Aquí

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),    // ← Asegúrate de tener esta línea
    AppRoutingModule,
    NgbModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
