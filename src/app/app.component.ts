import { Component } from '@angular/core';
import { PokemonService } from './shared/pokemon.service'
import { GOOGLE_MAPS_DIRECTIVES } from 'angular2-google-maps/core';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [GOOGLE_MAPS_DIRECTIVES],
  providers: [PokemonService]
})
export class AppComponent {

  public pokemons: Array<any>
  public lat: number
  public lng: number

  private PokemonService: PokemonService

  public constructor(PokemonService: PokemonService) {
    this.pokemons = []
    this.PokemonService = PokemonService
    this.PokemonService
      .getPosition()
      .then((position) => {
        this.lat = position.coords.latitude
        this.lng = position.coords.longitude
      })
    this.PokemonService
      .getPokemons()
      .then((pokemons) => {
        for (let pokemon of pokemons) {
          this.pokemons.push({
      		  lat: pokemon.latitude,
      		  lng: pokemon.longitude,
      		  label: pokemon.pokemon.id,
      		  draggable: false
          })
        }
      })
  }

}
