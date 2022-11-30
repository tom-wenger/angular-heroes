import { Component, EventEmitter, OnInit } from '@angular/core';
import {
  concatMap,
  filter,
  map,
  merge,
  mergeMap,
  Observable,
  scan,
  startWith,
  Subject,
  switchMap,
  tap,
} from 'rxjs';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessagesService } from '../messages.service';

interface AddHero {
  _tag: 'add-hero';
  hero: Hero;
}
const makeAddHero = (hero: Hero): AddHero => ({ _tag: 'add-hero', hero });

interface DeleteHero {
  _tag: 'delete-hero';
  id: number;
}
const makeDeleteHero = (id: number): DeleteHero => ({
  _tag: 'delete-hero',
  id,
});

type Action = AddHero | DeleteHero;

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
})
export class HeroesComponent implements OnInit {
  public heroes$!: Observable<Hero[]>;
  public addHero$ = new Subject<string>();
  public deleteHero$ = new Subject<Hero>();

  refreshButtonClicked$ = new EventEmitter();

  constructor(
    private heroService: HeroService,
    private messageService: MessagesService
  ) {}

  public getHeroes(): void {
    const fromServerStream$ = this.heroService.getHeroes();

    const requestOnRefreshStream$ = this.refreshButtonClicked$.pipe(
      switchMap(() => {
        return this.heroService.getHeroes();
      })
    );

    // Stream from Add-Button --> Callt den heroService
    const addedHeroResult$ = this.addHero$.pipe(
      this.filterHero,
      concatMap((name) => this.heroService.addHero(name)),
      map((hero) => makeAddHero(hero)),
      // map(hero => ({_tag: 'add-hero', hero} as AddHero)), //without Helpermethod
      tap((x) => console.log('after addhero', x))
    );

    // Stream from Delete-Button --> Callt den heroService
    const deletedHeroResult$ = this.deleteHero$.pipe(
      concatMap((hero) =>
        this.heroService.deleteHero(hero.id).pipe(map(() => hero))
      ),
      map((hero) => makeDeleteHero(hero.id)),
      tap((x) => console.log('after deleting', x))
    );

    //Main Stream
    this.heroes$ = merge(
      fromServerStream$.pipe(
        mergeMap((heroes) =>
          merge(addedHeroResult$, deletedHeroResult$).pipe(
            this.heroesState(heroes)
          )
        )
      ),
      requestOnRefreshStream$
    );
  }

  add(name: string): void {
    this.addHero$.next(name);
  }

  delete(hero: Hero): void {
    this.deleteHero$.next(hero);
  }

  ngOnInit(): void {
    this.getHeroes();
  }

  // Unterscheidet mit den Discriminated-Uniontypes zwischen Add und Delete
  heroesState(heroes: Hero[]) {
    return function (source: Observable<AddHero | DeleteHero>) {
      return source.pipe(
        scan((heroes, action): Hero[] => {
          switch (action._tag) {
            case 'add-hero':
              return [...heroes, action.hero];
            case 'delete-hero':
              return heroes.filter((hero) => hero.id != action.id);
          }
        }, heroes),
        startWith(heroes)
      );
    };
  }

  filterHero(heroName: Observable<string>): Observable<string> {
    return heroName.pipe(
      map((name) => name.trim()),
      filter((name) => Boolean(name))
    );
  }
}
