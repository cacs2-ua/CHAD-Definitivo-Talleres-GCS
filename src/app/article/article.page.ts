import { Component, OnInit } from '@angular/core';
import { People } from '../models/people';
import { ActivatedRoute } from '@angular/router';
import { Planet } from '../models/planet';
import { Species } from '../models/species';
import { Starship } from '../models/starship';
import { WikiService } from '../services/wiki.service';
import { Storage } from '@ionic/storage-angular';
import { StorageService } from '../services/storage.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-article',
  templateUrl: './article.page.html',
  styleUrls: ['./article.page.scss'],
  standalone: false,
})
export class ArticlePage implements OnInit {
  title: string ="";
    id: string="";
    category: string="";
  
    people: People = new People();
    planet: Planet = new Planet();
    species: Species = new Species();
    starship: Starship = new Starship();

  constructor(private route: ActivatedRoute, private srv: WikiService, private storageSrv: StorageService, private toastController: ToastController) { }

  public isFavorite: boolean=false;
  private favorites:any[] = [];
  
  ngOnInit() {
  this.category = this.route.snapshot.paramMap.get("cat") ?? '';
  this.id = this.route.snapshot.paramMap.get("id") ?? '';

  this.storageSrv.get('Favorites').then(data => {
    this.favorites = data??[];
    var aux = this.favorites.find(f=> {
      return f.id == this.id && f.category == this.category
    });
    if (aux!=null){
      this.isFavorite=true;
    }
  })
    
}


  generateURL(cat: string, id: string){
    return "/tabs/wiki/article/" + cat + "/" + id;
  }
  
  async presentToast(text:string){
    const toast = await this.toastController.create({
      message: text,
      duration: 2000
    });
    toast.present();
  }
    

  toggleFavorite(){
    var theName:string="";
    if (this.isFavorite==true){
      this.isFavorite=false;
      var aux = this.favorites.findIndex(f => {return f.id == this.id && f.category == this.category})
      if (aux>=0) {this.favorites.splice(aux, 1);}
      this.storageSrv.set('favorites', this.favorites)
      this.presentToast("Article removed from favorites successfully");

    } else {
      this.isFavorite=true;
      switch(this.category){
        case 'People':
          theName = this.people.name;
          break;
        case 'Planets':
          theName = this.planet.name;
          break;
        case 'Species':
          theName = this.species.name;
          break;
        case 'Starships':
          theName = this.starship.name;
          break;
      }
      this.favorites.push({category: this.category, id: this.id, name: theName});
      this.storageSrv.set('favorites', this.favorites);
      this.presentToast('Article stored successfully');
    }
  }

}
