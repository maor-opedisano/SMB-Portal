/**
 * Created by if_found_call_0586288454 on 18/06/2017 ap. J.-C..
 */

import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({ selector: '[myHighlight]' })
export class HighlightDirective {
  @Input('myHighlight') highlightColor: string;
  @Input('fontSize') fontSize: number;
  originalSize: any;

  constructor(private el: ElementRef) {
    this.originalSize = this.el.nativeElement.style.fontSize;
    console.log(this.originalSize);
  }



  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.highlightColor || 'purple');
    this.biggerFont(this.fontSize);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight('transparent');
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }

  private biggerFont(size: number) {
    this.el.nativeElement.style.fontSize = size + 'px';
  }

}
