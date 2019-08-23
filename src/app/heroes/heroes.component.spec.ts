import { HeroesComponent } from './heroes.component';
import { of } from 'rxjs/internal/observable/of';

describe('Heroes Component', () => {
  let sut: HeroesComponent;
  let HEROES;
  let mockHeroService;

  beforeEach(() => {
    HEROES = [
      {id: 1, name: 'SpiderDude', strength: 8},
      {id: 2, name: 'Wonderful Woman', strength: 24},
      {id: 3, name: 'SuperDude', strength: 55}
    ];

    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);

    sut = new HeroesComponent(mockHeroService);
  });

  describe('delete', () => {
    it('should remove the indicated hero from the heroes list', () => {
      mockHeroService.deleteHero.and.returnValue(of(true));
      sut.heroes = HEROES;
      const heroToDelete = HEROES[2];

      sut.delete(heroToDelete);

      expect(sut.heroes.length).toEqual(2);
      expect(sut.heroes.find( e => e === heroToDelete)).toBeUndefined();
    });
  });
});
