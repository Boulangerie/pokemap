import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class PokemonService {

  private Http: Http
  private position: any

  public constructor(Http: Http) {
    navigator.geolocation.getCurrentPosition((position) => {
      this.position = position
    })
    this.Http = Http
  }

  public getPokemons(): Promise<Array<any>> {
    let pokemons: Array<any> = []
    return this
      .getHeartbeat()
      .then((cells: Array<any>) => {
        for (let cell of cells) {
          if (cell.WildPokemon.length > 0) {
            pokemons = pokemons.concat(cell.WildPokemon)
          }
        }
        return pokemons
      })
  }

  public getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((position) => {
        resolve(position)
      })
    })
  }

  private getHeartbeat(): Promise<any> {
    return this.getPosition()
      .then((position) => {
        return this.Http
          .get('http://127.0.0.1:3000/getHeartbeat/' + position.coords.latitude + ',' + position.coords.longitude)
          .toPromise()
          .then((response) => {
            return response.json().cells
          })
      })
  }

}
