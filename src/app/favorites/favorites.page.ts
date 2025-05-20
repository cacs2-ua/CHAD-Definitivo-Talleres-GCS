import { Component, OnInit } from '@angular/core';
import { CommonModule }       from '@angular/common';
import { RouterModule }       from '@angular/router';
import { IonicModule, MenuController, ToastController } from '@ionic/angular';

import { StorageService } from '../services/storage.service';

@Component({
  selector   : 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls  : ['./favorites.page.scss'],

  /*  ⭐  Esta página es stand-alone  */
  standalone : true,
  imports    : [
    CommonModule,      // ngIf • ngFor
    IonicModule,       // componentes ion-*
    RouterModule       // routerLink
  ]
})
export class FavoritesPage implements OnInit {

  favorites: any[] = [];

  constructor(
    private storageSrv: StorageService,
    private menuCtrl  : MenuController,
    private toastCtrl : ToastController
  ) {}

  /* Se crea el Storage una sola vez */
  async ngOnInit() { await this.storageSrv.init(); }

  /* Cada vez que la vista entra en pantalla, refresca la lista */
  async ionViewWillEnter() {
    this.favorites = (await this.storageSrv.get('favorites')) || [];
  }

  /* Ruta al artículo */
  generateURL(cat: string, id: number) {
    return `/article/${cat}/${id}`;
  }

  /* Vaciar todos los favoritos */
  async clearAll() {
    await this.storageSrv.set('favorites', []);
    this.favorites = [];
    const t = await this.toastCtrl.create({
      message : 'Todos los favoritos han sido eliminados',
      duration: 1500,
      position: 'bottom'
    });
    t.present();
  }
}
