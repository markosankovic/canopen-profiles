// http://stackoverflow.com/questions/36370826/how-to-get-mathjax-working-with-angular2
import { Directive, ElementRef, Input } from '@angular/core';

declare var MathJax: any;

@Directive({
  selector: '[MathJax]'
})
export class MathJaxDirective {
  @Input('MathJax')
  expression: string;

  constructor(private el: ElementRef) { }

  ngOnChanges() {
    this.el.nativeElement.innerHTML = this.expression;
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, this.el.nativeElement]);
  }
}
