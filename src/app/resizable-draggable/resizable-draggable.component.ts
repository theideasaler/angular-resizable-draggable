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
  private boxSpec: { left: number, top: number, width: number, height: number };
  public mouse: {x: number, y: number}
  public status: Status = Status.OFF;
  private mouseAndBoxDetails: {x: number, y: number, left: number, top: number}

  ngOnInit() {}

  ngAfterViewInit(){
    this.loadBox();
  }

  private loadBox(){
    const {left, top, width, height} = this.box.nativeElement.getBoundingClientRect();
    this.boxSpec = {left, top, width, height};
  }

  setStatus(event: MouseEvent, status: number){
    if(status === 1) event.stopPropagation();
    else if(status === 2) this.mouseAndBoxDetails = { x: event.clientX, y: event.clientY, left: this.left, top: this.top};
    this.status = status;
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent){
    this.mouse = { x: event.clientX, y: event.clientY };

    if(this.status === Status.RESIZE) this.resize();
    else if(this.status === Status.MOVE) this.move();
  }

  private resize(){
    this.width = this.mouse.x - this.boxSpec.left;
    this.height = this.mouse.y - this.boxSpec.top;
  }

  private move(){
    this.left = this.mouseAndBoxDetails.left + (this.mouse.x - this.mouseAndBoxDetails.x);
    this.top = this.mouseAndBoxDetails.top + (this.mouse.y - this.mouseAndBoxDetails.y);
  }
}
