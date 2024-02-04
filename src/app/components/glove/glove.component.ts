import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgClass, NgStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatRippleModule } from '@angular/material/core';
import { MatSliderModule } from '@angular/material/slider';
import { CraftService } from 'src/app/services/craft.service';
import { Skin } from 'src/models/Skin';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-glove',
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
  templateUrl: './glove.component.html',
  styleUrl: './glove.component.scss',
})
export class GloveComponent implements OnInit {
  gloves: Skin[] = [];

  gloveSearch: string = '';

  selectedGlove?: Skin;

  patternId = 1;
  float = 0;

  constructor(private service: CraftService) {}

  ngOnInit(): void {
    this.service.getGloves().subscribe({
      next: (gloves) => {
        this.gloves = gloves;
      },
    });
  }

  get filteredGloves() {
    return this.gloves.filter((glove) => {
      for (const word of this.gloveSearch.toLowerCase().split(' ')) {
        if (!glove.title.toLowerCase().includes(word)) {
          return false;
        }
      }

      return true;
    });
  }

  selectGlove(glove: Skin) {
    this.selectedGlove = glove;
  }

  copyCode(element: HTMLInputElement) {
    navigator.clipboard.writeText(element.value);
  }
}
