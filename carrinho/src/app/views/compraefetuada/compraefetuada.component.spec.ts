import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompraefetuadaComponent } from './compraefetuada.component';

describe('CompraefetuadaComponent', () => {
  let component: CompraefetuadaComponent;
  let fixture: ComponentFixture<CompraefetuadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompraefetuadaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompraefetuadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
