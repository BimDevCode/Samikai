import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleCardItemComponent } from './article-card-item.component';

describe('ArticleCardItemComponent', () => {
  let component: ArticleCardItemComponent;
  let fixture: ComponentFixture<ArticleCardItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArticleCardItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArticleCardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
