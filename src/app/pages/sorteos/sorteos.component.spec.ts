import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SorteosComponent } from './sorteos.component';

describe('SorteosComponent', () => {
  let component: SorteosComponent;
  let fixture: ComponentFixture<SorteosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SorteosComponent]
    });
    fixture = TestBed.createComponent(SorteosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
