import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeLoader } from './tree-loader';

describe('TreeLoader', () => {
  let component: TreeLoader;
  let fixture: ComponentFixture<TreeLoader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TreeLoader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TreeLoader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
