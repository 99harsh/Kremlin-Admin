import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedTransactionComponent } from './rejected-transaction.component';

describe('RejectedTransactionComponent', () => {
  let component: RejectedTransactionComponent;
  let fixture: ComponentFixture<RejectedTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RejectedTransactionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RejectedTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
