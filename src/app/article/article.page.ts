import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';

import { People } from '../models/people';
import { Planet } from '../models/planet';
import { Species } from '../models/species';
import { Starship } from '../models/starship';

import { WikiService } from '../services/wiki.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.page.html',
  styleUrls: ['./article.page.scss'],
  standalone: false,
})
export class ArticlePage implements OnInit {
  title: string = '';
  id: string = '';
  category: string = '';

  people: People = new People();
  planet: Planet = new Planet();
  species: Species = new Species();
  starship: Starship = new Starship();

  // Para gestionar favoritos
  isFavorite = false;
  favorites: Array<{ id: string; category: string; name: string }> = [];

  constructor(
    private route: ActivatedRoute,
    private srv: WikiService,
    private storageSrv: StorageService,   // <-- INYECTADO
    private toastCtrl: ToastController    // <-- INYECTADO
  ) {}

  async ngOnInit() {
    // Obtención de parámetros
    this.category = this.route.snapshot.paramMap.get('cat') ?? '';
    this.id = this.route.snapshot.paramMap.get('id') ?? '';

    // Carga del artículo según categoría
    this.srv.getArticle(this.category, this.id).subscribe(async (result: any) => {
      switch (this.category) {
        case 'People':
          this.people = result.result.properties;
          this.title = this.people.name;
          break;
        case 'Planets':
          this.planet = result.result.properties;
          this.title = this.planet.name;
          break;
        case 'Species':
          this.species = result.result.properties;
          this.title = this.species.name;
          break;
        case 'Starships':
          this.starship = result.result.properties;
          this.title = this.starship.name;
          break;
      }

      // Tras cargar título, inicializamos storage y comprobamos favoritos
      await this.storageSrv.init();
      this.favorites = (await this.storageSrv.get('favorites')) || [];

      this.isFavorite = this.favorites.some(
        f => f.id === this.id && f.category === this.category
      );
    });
  }

  /** Añade o quita de favoritos */
  async toggleFavorite() {
    if (this.isFavorite) {
      // Quitar de favoritos
      this.favorites = this.favorites.filter(
        f => !(f.id === this.id && f.category === this.category)
      );
      await this.storageSrv.set('favorites', this.favorites);
      this.isFavorite = false;
      this.presentToast('Eliminado de favoritos');
    } else {
      // Añadir a favoritos
      const item = { id: this.id, category: this.category, name: this.title };
      this.favorites.push(item);
      await this.storageSrv.set('favorites', this.favorites);
      this.isFavorite = true;
      this.presentToast('Añadido a favoritos');
    }
  }

  /** Toast genérico */
  private async presentToast(msg: string) {
    const t = await this.toastCtrl.create({
      message: msg,
      duration: 1500,
      position: 'bottom'
    });
    await t.present();
  }

  /** Genera la URL de navegación al artículo (para listados) */
  generateURL(cat: string, id: string) {
    return `/tabs/wiki/article/${cat}/${id}`;
  }
}
