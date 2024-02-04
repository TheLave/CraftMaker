import { Component } from '@angular/core';
import { SkinComponent } from './components/skin/skin.component';
import { NgClass } from '@angular/common';
import { GloveComponent } from './components/glove/glove.component';
import { AgentComponent } from './components/agent/agent.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [NgClass, SkinComponent, GloveComponent, AgentComponent],
})
export class AppComponent {
  currentTab = 'skin';

  openTab(tab: 'skin' | 'glove' | 'agent') {
    this.currentTab = tab;
  }
}
