import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantSidebarComponent } from './restaurant-sidebar.component';

describe('RestaurantSidebarComponent', () => {
  let component: RestaurantSidebarComponent;
  let fixture: ComponentFixture<RestaurantSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RestaurantSidebarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RestaurantSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
