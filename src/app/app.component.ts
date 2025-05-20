import { Component, OnInit } from '@angular/core';
import { MenuController, ToastController } from '@ionic/angular';

@Component({
  selector   : 'app-root',
  templateUrl: 'app.component.html',
  styleUrls  : ['app.component.scss'],
  standalone : false
})
export class AppComponent implements OnInit {

  menuOptions: any[] = [];

  constructor(
    private menuCtrl : MenuController,
    private toastCtrl: ToastController
  ) {}

  async ngOnInit() {
    await this.loadMenu();
    this.presentToast('¡Bienvenido a la Wiki Star-Wars!');
  }

  private async loadMenu() {
    const res        = await fetch('assets/data/menu.json');
    this.menuOptions = await res.json();
  }

  /** Cierra el menú al pulsar una opción */
  closeMenu() { this.menuCtrl.close('principal'); }

  /** Toast genérico */
  private async presentToast(msg: string) {
    const t = await this.toastCtrl.create({ message: msg, duration: 2000, position: 'bottom' });
    t.present();
  }
}
