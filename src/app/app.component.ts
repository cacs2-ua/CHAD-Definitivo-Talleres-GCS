import { Component, OnInit } from '@angular/core';
import { Platform, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {
  readonly menuFile: string = "../assets/data/menu.json";
  menuOptions = [];

  constructor(public toastController: ToastController) {}

  async ngOnInit() {
    this.getMenu();
    await this.presentToast();
  }

  getMenu() {
    fetch(this.menuFile).then(res => res.json()).then(json => {
      this.menuOptions = json;
      console.log(this.menuOptions);
    });
  }

  async presentToast(): Promise<void> {
    const toast = await this.toastController.create({
      message: 'Bienvenido a la app!',
      duration: 2000,
      position: 'bottom',
    });
    await toast.present();
  }
}