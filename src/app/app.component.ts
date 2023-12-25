import { Component, OnInit } from '@angular/core';
import {
  NgSwitch,
  NgSwitchDefault,
  NgSwitchCase,
  AsyncPipe,
  KeyValuePipe,
  JsonPipe,
  NgClass,
  NgStyle,
} from '@angular/common';
import { CraftService } from './services/craft.service';
import { Weapon } from 'src/models/Weapon';
import { Skin } from 'src/models/Skin';
import { Sticker } from 'src/models/Sticker';
import { FormsModule } from '@angular/forms';
import { PopupComponent } from './components/popup/popup.component';
import { MatSliderModule } from '@angular/material/slider';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [FormsModule, NgClass, NgStyle, PopupComponent, MatSliderModule],
})
export class AppComponent implements OnInit {
  weapons: Weapon[] = [];
  skins: Skin[] = [];
  stickers: Sticker[] = [];

  weaponSearch: string = '';
  skinSearch: string = '';
  stickerSearch: string = '';
  minHue = 0;
  maxHue = 360;

  stickerPopup = false;
  currentStickerPlace = 0;

  selectedWeapon?: Weapon;
  selectedSkin?: Skin;
  selectedStickers: { [key: number]: Sticker | null } = {
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
  };
  patternId = 1;
  float = 0;

  constructor(private service: CraftService) {}

  ngOnInit(): void {
    this.service.getWeapons().subscribe({
      next: (weapons) => {
        for (const [id, weapon] of Object.entries(weapons)) {
          weapon.id = id;
        }
        this.weapons = Object.values(weapons);
      },
    });

    this.service.getSkins().subscribe({
      next: (skins) => {
        this.skins = skins;
      },
    });

    this.service.getStickers().subscribe({
      next: (stickers) => {
        this.stickers = stickers;
      },
    });
  }

  get filteredWeapons() {
    return this.weapons.filter((weapon) =>
      weapon.display.toLowerCase().includes(this.weaponSearch.toLowerCase()),
    );
  }

  get filteredSkins() {
    return this.skins.filter(
      (skin) =>
        skin.title.toLowerCase().includes(this.skinSearch.toLowerCase()) &&
        !skin.glove,
    );
  }

  get filteredStickers() {
    return this.stickers.filter(
      (sticker) =>
        sticker.title
          .toLowerCase()
          .includes(this.stickerSearch.toLowerCase()) &&
        sticker.hue >= this.minHue &&
        sticker.hue <= this.maxHue,
    );
  }

  selectWeapon(weapon: Weapon) {
    this.selectedWeapon = weapon;
  }

  selectSkin(skin: Skin) {
    this.selectedSkin = skin;
  }

  openStickerPopup(place: number) {
    this.currentStickerPlace = place;
    this.stickerPopup = true;
  }

  selectSticker(sticker: Sticker) {
    this.selectedStickers[this.currentStickerPlace] = sticker;
    this.closePopup();
  }

  removeSticker(place: number) {
    this.selectedStickers[place] = null;
  }

  copyCode(element: HTMLInputElement) {
    navigator.clipboard.writeText(element.value);
  }

  closePopup() {
    this.stickerPopup = false;
  }
}
