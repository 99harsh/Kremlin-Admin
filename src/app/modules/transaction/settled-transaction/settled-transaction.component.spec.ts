import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettledTransactionComponent } from './settled-transaction.component';

describe('SettledTransactionComponent', () => {
  let component: SettledTransactionComponent;
  let fixture: ComponentFixture<SettledTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettledTransactionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettledTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
