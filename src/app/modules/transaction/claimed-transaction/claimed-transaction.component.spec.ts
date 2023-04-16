import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimedTransactionComponent } from './claimed-transaction.component';

describe('ClaimedTransactionComponent', () => {
  let component: ClaimedTransactionComponent;
  let fixture: ComponentFixture<ClaimedTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClaimedTransactionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClaimedTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
