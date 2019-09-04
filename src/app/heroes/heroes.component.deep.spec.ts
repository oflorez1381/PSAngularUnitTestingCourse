import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HeroesComponent} from './heroes.component';
import {HeroService} from '../hero.service';
import {of} from 'rxjs/internal/observable/of';
import {By} from '@angular/platform-browser';
import {HeroComponent} from '../hero/hero.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe(' Heroes Component (deep tests)', () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroService;
  let HEROES;

  beforeEach(() => {

    HEROES = [
      {id: 1, name: 'SpiderDude', strength: 8},
      {id: 2, name: 'Wonderful Woman', strength: 24},
      {id: 3, name: 'SuperDude', strength: 55}
    ];

    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);

    TestBed.configureTestingModule({
      declarations: [
        HeroesComponent,
        HeroComponent
      ],
      providers: [
        { provide: HeroService, useValue: mockHeroService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(HeroesComponent);
  });

  it('should render each hero as a HeroComponent', () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    // run ngOnInit
    fixture.detectChanges();

    const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
    expect(heroComponents.length).toEqual(3);

    for (let i = 0; i < heroComponents.length; i++) {
      expect(heroComponents[i].componentInstance.hero).toEqual(HEROES[i]);
    }
  });

  it(`should call heroService.deleteHero when the Hero Component's
      delete button is clicked version 1`, () => {
    spyOn(fixture.componentInstance, 'delete');
    mockHeroService.getHeroes.and.returnValue(of(HEROES));

    fixture.detectChanges();

    const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));

    heroComponents[0].query(By.css('button'))
      .triggerEventHandler('click', {stopPropagation: () => {}});

    expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);

  });

  it(`should call heroService.deleteHero when the Hero Component's
      delete button is clicked version 2`, () => {
    spyOn(fixture.componentInstance, 'delete');
    mockHeroService.getHeroes.and.returnValue(of(HEROES));

    fixture.detectChanges();

    const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));

    (<HeroComponent>heroComponents[0].componentInstance).delete.emit(undefined);

    expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);

  });

  it(`should call heroService.deleteHero when the Hero Component's
      delete button is clicked version 3`, () => {
    spyOn(fixture.componentInstance, 'delete');
    mockHeroService.getHeroes.and.returnValue(of(HEROES));

    fixture.detectChanges();

    const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));

    heroComponents[0].triggerEventHandler('delete', null);

    expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);

  });


});
