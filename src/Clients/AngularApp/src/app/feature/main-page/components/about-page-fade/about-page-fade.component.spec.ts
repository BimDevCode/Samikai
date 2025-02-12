import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutPageFadeComponent } from './about-page-fade.component';

describe('AboutPageFadeComponent', () => {
  let component: AboutPageFadeComponent;
  let fixture: ComponentFixture<AboutPageFadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AboutPageFadeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AboutPageFadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
