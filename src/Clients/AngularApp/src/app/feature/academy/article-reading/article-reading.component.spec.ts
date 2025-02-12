import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleReadingComponent } from './article-reading.component';

describe('ArticleReadingComponent', () => {
  let component: ArticleReadingComponent;
  let fixture: ComponentFixture<ArticleReadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArticleReadingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArticleReadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
