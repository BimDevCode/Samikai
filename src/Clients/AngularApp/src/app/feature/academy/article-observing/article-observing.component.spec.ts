import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleObservingComponent } from './article-observing.component';

describe('ArticleObservingComponent', () => {
  let component: ArticleObservingComponent;
  let fixture: ComponentFixture<ArticleObservingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArticleObservingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArticleObservingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
