import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { NgStyle } from '@angular/common';

@Component({
    selector: 'app-popup',
    templateUrl: './popup.component.html',
    styleUrls: ['./popup.component.scss'],
    standalone: true,
    imports: [NgStyle],
})
export class PopupComponent implements OnInit, OnDestroy {
  @Input() width: string = '40vw';
  @Output() onClose = new EventEmitter();
  @ViewChild('popup') popup!: ElementRef<HTMLDivElement>;
  @ViewChild('container') container!: ElementRef<HTMLDivElement>;
  listener?: () => void;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    this.listener = this.renderer.listen('window', 'mousedown', (e: any) => {
      if (
        this.popup.nativeElement.contains(e.target) &&
        e.target !== this.container.nativeElement &&
        !this.container.nativeElement.contains(e.target)
      ) {
        this.onClose.emit();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.listener) {
      this.listener();
    }
  }
}
