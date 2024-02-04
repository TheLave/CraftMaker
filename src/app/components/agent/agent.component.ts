import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgClass, NgStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatRippleModule } from '@angular/material/core';
import { MatSliderModule } from '@angular/material/slider';
import { CraftService } from 'src/app/services/craft.service';
import { Skin } from 'src/models/Skin';
import { PopupComponent } from '../popup/popup.component';
import { Agent } from 'src/models/Agent';

@Component({
  selector: 'app-agent',
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
  templateUrl: './agent.component.html',
  styleUrl: './agent.component.scss',
})
export class AgentComponent implements OnInit {
  agents: Agent[] = [];

  agentSearch: string = '';

  selectedAgent?: Agent;

  patternId = 1;
  float = 0;

  constructor(private service: CraftService) {}

  ngOnInit(): void {
    this.service.getAgents().subscribe({
      next: (agents) => {
        this.agents = agents;
      },
    });
  }

  get filteredGloves() {
    return this.agents.filter((agent) => {
      for (const word of this.agentSearch.toLowerCase().split(' ')) {
        if (!agent.title.toLowerCase().includes(word)) {
          return false;
        }
      }

      return true;
    });
  }

  selectAgent(agent: Agent) {
    this.selectedAgent = agent;
  }

  copyCode(element: HTMLInputElement) {
    navigator.clipboard.writeText(element.value);
  }
}
