import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalInformationComponent } from './global-information.component';

describe('GlobalInformationComponent', () => {
  let component: GlobalInformationComponent;
  let fixture: ComponentFixture<GlobalInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlobalInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
