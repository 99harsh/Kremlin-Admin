import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuspendedUsersComponent } from './suspended-users.component';

describe('SuspendedUsersComponent', () => {
  let component: SuspendedUsersComponent;
  let fixture: ComponentFixture<SuspendedUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuspendedUsersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuspendedUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
