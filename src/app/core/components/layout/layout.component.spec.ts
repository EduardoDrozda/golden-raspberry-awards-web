import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LayoutComponent } from './layout.component';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { RoutesEnum } from '@core/enums';
import { provideRouter, withComponentInputBinding } from '@angular/router';

@Component({ template: '' })
class DummyComponent { }

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutComponent],
      providers: [
        provideRouter(
          [
            { path: RoutesEnum.DASHBOARD, component: DummyComponent },
            { path: RoutesEnum.MOVIES, component: DummyComponent },
          ],
          withComponentInputBinding()
        )
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the sidebar options correctly', () => {
    const sidebarLinks = fixture.debugElement.queryAll(
      By.css('.layout__sidebar-options')
    );
    expect(sidebarLinks.length).toBe(component.sidebarOptions.length);

    sidebarLinks.forEach((link, index) => {
      const option = component.sidebarOptions[index];
      const icon = link.query(By.css('i')).nativeElement;
      const title = link.query(By.css('span')).nativeElement;

      expect(icon.className).toBe(option.icon);
      expect(title.textContent.trim()).toBe(option.title);
    });
  });

  it('should render project title in header', () => {
    const header = fixture.debugElement.query(By.css('.layout__header span')).nativeElement;
    expect(header.textContent).toContain('Frontend Angular Test');
  });
});
