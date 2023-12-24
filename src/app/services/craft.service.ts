import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
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
    return this.http.get<Skin[]>('assets/skins.json');
  }

  getStickers() {
    return this.http.get<Sticker[]>('assets/stickers.json');
  }
}
