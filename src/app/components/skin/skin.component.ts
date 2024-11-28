import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgClass, NgStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatRippleModule } from '@angular/material/core';
import { MatSliderModule } from '@angular/material/slider';
import { CraftService } from 'src/app/services/craft.service';
import { Skin } from 'src/models/Skin';
import { Sticker } from 'src/models/Sticker';
import { Weapon } from 'src/models/Weapon';
import { PopupComponent } from '../popup/popup.component';
import { generateLink, Rarity } from 'src/util/inspect';

@Component({
  selector: 'app-skin',
  standalone: true,
  imports: [
    FormsModule,
    NgClass,
    NgStyle,
    PopupComponent,
    MatSliderModule,
    MatRippleModule,
    ScrollingModule,
  ],
  templateUrl: './skin.component.html',
  styleUrl: './skin.component.scss',
})
export class SkinComponent implements OnInit {
  weapons: Weapon[] = [];
  skins: Skin[] = [];
  stickers: Sticker[] = [];

  weaponSearch: string = '';
  skinSearch: string = '';
  stickerSearch: string = '';
  includeAutographs = true;
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
  generatedLink = '';

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
    return this.weapons.filter((weapon) => {
      for (const word of this.weaponSearch.toLowerCase().split(' ')) {
        if (!weapon.display.toLowerCase().includes(word)) {
          return false;
        }
      }

      return true;
    });
  }

  get filteredSkins() {
    return this.skins.filter((skin) => {
      for (const word of this.skinSearch.toLowerCase().split(' ')) {
        if (!skin.title.toLowerCase().includes(word)) {
          return false;
        }
      }

      return true;
    });
  }

  get filteredStickers() {
    return this.stickers.filter((sticker) => {
      if (!(sticker.hue >= this.minHue && sticker.hue <= this.maxHue)) {
        return false;
      }

      if (!this.includeAutographs && sticker.isSignature) {
        return false;
      }

      for (const word of this.stickerSearch.toLowerCase().split(' ')) {
        if (!sticker.title.toLowerCase().includes(word)) {
          return false;
        }
      }

      return true;
    });
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
    this.selectedStickers[this.currentStickerPlace] = { ...sticker, wear: 0 };
    this.closePopup();
  }

  removeSticker(place: number) {
    this.selectedStickers[place] = null;
  }

  removeAllStickers() {
    this.selectedStickers = {
      1: null,
      2: null,
      3: null,
      4: null,
      5: null,
    };
  }

  copyCode(element: HTMLInputElement) {
    navigator.clipboard.writeText(element.value);
  }

  parseInspectStickers() {
    const stickers = [];

    for (const num of [1, 2, 3, 4, 5]) {
      const sticker = this.selectedStickers[num];
      if (sticker) {
        stickers.push({
          slot: num - 1,
          stickerId: sticker.id,
          wear: 0,
        });
      }
    }

    return stickers;
  }

  createInspectLink() {
    if (!this.selectedWeapon || !this.selectedSkin) {
      return;
    }

    this.generatedLink = generateLink({
      defindex: parseInt(this.selectedWeapon.id),
      paintindex: this.selectedSkin.paint,
      paintseed: this.patternId,
      paintwear: this.float,
      rarity: Rarity.COVERT, // 5
      stickers: this.parseInspectStickers(),
    });
  }

  closePopup() {
    this.stickerPopup = false;
  }
}
