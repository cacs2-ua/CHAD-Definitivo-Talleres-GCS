import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
  standalone: false,
})
export class FavoritesPage implements OnInit {

  favorites: any[] = [];

  constructor(private storageSrv: StorageService) {}

  async ngOnInit() {
    await this.storageSrv.init();
    this.favorites = await this.storageSrv.get('favorites') || [];
  }

  /** Construye la ruta al artículo */
  generateURL(cat: string, id: number) {
    return `/article/${cat}/${id}`;
  }

}
