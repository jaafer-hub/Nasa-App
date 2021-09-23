import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { latLng, tileLayer } from 'leaflet';
import * as L from 'leaflet';
import { ModalController } from '@ionic/angular';
import { AddPostComponent } from './add-post/add-post.component';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  // Define our base layers so we can reference them multiple times
  streetMaps = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    detectRetina: true,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });
  wMaps = tileLayer('http://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png', {
    detectRetina: true,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

  layersControl = {
    baseLayers: {
      'street Maps': this.streetMaps,
      'wikimedia Maps': this.wMaps
    }
  };

  options = {
    layers: [ this.streetMaps],
    zoom: 7,
    center: latLng([ 46.879966, -121.726909 ])
  };

  drawItems: L.FeatureGroup = L.featureGroup();

drawOptions = {
  position: 'topright',
	edit: {
		featureGroup: this.drawItems
	}
};

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {

  }
  ionViewDidEnter(){
  }

  public onDrawCreated(e: any) {
		// tslint:disable-next-line:no-console
		console.log('Draw Created Event!');

		const layer = (e as L.DrawEvents.Created).layer;
    console.log(layer);
		this.drawItems.addLayer(layer);
    this.modalCtrl.create({component: AddPostComponent})
    .then(modelEl => {modelEl.present();});
	}

  onMapReady(map: L.Map) {
    setTimeout(() => {
       map.invalidateSize();
    }, 200);
  }


}
