import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, HostListener } from '@angular/core';

const enum Status {
  OFF = 0,
  RESIZE = 1,
  MOVE = 2
}

@Component({
  selector: 'app-resizable-draggable',
  templateUrl: './resizable-draggable.component.html',
  styleUrls: ['./resizable-draggable.component.scss']
})
export class ResizableDraggableComponent implements OnInit, AfterViewInit {
  @Input('width') public width: number;
  @Input('height') public height: number;
  @Input('left') public left: number;
  @Input('top') public top: number;
  @ViewChild("box") public box: ElementRef;
  public active = false;
  public boxSpec: { left: number, top: number, width: number, height: number };
  public mouse: {x: number, y: number}
  public status: Status = Status.OFF;

  constructor() { }

  ngOnInit() {}

  ngAfterViewInit(){
    this.loadBox();
  }

  loadBox(){
    const {left, top, width, height} = this.box.nativeElement.getBoundingClientRect();
    this.boxSpec = {left, top, width, height};
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent){
    this.mouse = { x: event.clientX, y: event.clientY }

    if(this.status === Status.RESIZE) this.resize();
  }

  resize(){
    this.width = this.mouse.x - this.boxSpec.left;
    this.height = this.mouse.y - this.boxSpec.top;
  }
}
