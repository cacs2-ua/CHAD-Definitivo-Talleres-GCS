import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) { this.init(); }

  /** Inicializa la BBDD local */
  async init() {
    this._storage = await this.storage.create();
  }

  /** Guarda pares clave–valor */
  set(key: string, value: any) {
    return this._storage?.set(key, value);
  }

  /** Lee pares clave–valor */
  get(key: string) {
    return this._storage?.get(key);
  }
}
