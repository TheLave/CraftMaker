import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import { Agent } from 'src/models/Agent';
import { Skin } from 'src/models/Skin';
import { Sticker } from 'src/models/Sticker';
import { Weapon } from 'src/models/Weapon';

@Injectable({
  providedIn: 'root',
})
export class CraftService {
  constructor(private http: HttpClient) {}

  getWeapons() {
    return this.http.get<{ [key: string]: Weapon }>('assets/weapons.json');
  }

  getSkins() {
    return this.http
      .get<Skin[]>('assets/skins.json')
      .pipe(map((skins) => skins.filter((skin) => !skin.glove)));
  }

  getStickers() {
    return this.http.get<Sticker[]>('assets/stickers.json');
  }

  getGloves() {
    return this.http
      .get<Skin[]>('assets/skins.json')
      .pipe(map((skins) => skins.filter((skin) => skin.glove)));
  }

  getAgents() {
    return this.http.get<Agent[]>('assets/agents.json');
  }
}
