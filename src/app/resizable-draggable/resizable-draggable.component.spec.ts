import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResizableDraggableComponent } from './resizable-draggable.component';

describe('ResizableDraggableComponent', () => {
  let component: ResizableDraggableComponent;
  let fixture: ComponentFixture<ResizableDraggableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResizableDraggableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResizableDraggableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
