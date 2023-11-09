import { Component } from '@angular/core';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts-page.component.html',
  styleUrls: ['./contacts-page.component.scss']
})
export class ContactsPageComponent {
  mapOptions: google.maps.MapOptions = {
    center: { lat:  50.44301739987975, lng: 30.479159355113378 },
    zoom: 14
  };

  marker = {
    position: { lat: 50.44301739987975, lng: 30.479159355113378 },
  }
}
