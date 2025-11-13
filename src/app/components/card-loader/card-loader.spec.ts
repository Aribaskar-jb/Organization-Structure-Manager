import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardLoader } from './card-loader';

describe('CardLoader', () => {
  let component: CardLoader;
  let fixture: ComponentFixture<CardLoader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardLoader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardLoader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
