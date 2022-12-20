import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Observable, switchMap } from 'rxjs';
import { Hero } from './hero';
import { HeroService } from './hero.service';

export type StoreStatus = 'loading' | 'loaded' | 'error';

export interface HeroesState {
  heroes: Hero[];
  status: StoreStatus;
}

const initialState: HeroesState = {
  heroes: [],
  status: 'loading',
};

@Injectable()
export class HeroesStore extends ComponentStore<HeroesState> {
  constructor(private heroService: HeroService) {
    super(initialState);
  }

  //Selector
  readonly heroes$: Observable<Hero[]> = this.select((state) => state.heroes);
  readonly status$: Observable<string> = this.select((state) => state.status);

  //Updater (=Reducer)
  readonly addHeroSuccess = this.updater((state, hero: Hero) => ({
    ...state,
    heroes: [...state.heroes, hero],
  }));

  readonly deleteHeroSuccess = this.updater((state, id: number) => ({
    ...state,
    heroes: state.heroes.filter((hero) => hero.id !== id),
  }));

  readonly heroesLoadedSuccess = this.updater((state, heroes: Hero[]) => ({
    ...state,
    heroes,
    status: 'loaded',
  }));

  // EFFECTS
  readonly loadHeroes = this.effect(() => {
    return this.heroService.getHeroes().pipe(
      tapResponse(
        (heroes) => {
          this.heroesLoadedSuccess(heroes);
        },
        (error) => console.log(error)
      )
    );
  });

  readonly addHero = this.effect((name$: Observable<string>) => {
    return name$.pipe(
      switchMap((name: string) =>
        this.heroService.addHero(name).pipe(
          tapResponse(
            (hero) => {
              this.addHeroSuccess(hero);
            },
            (error) => console.log(error)
          )
        )
      )
    );
  });

  readonly deleteHero = this.effect((id$: Observable<number>) => {
    return id$.pipe(
      switchMap((id: number) =>
        this.heroService.deleteHero(id).pipe(
          tapResponse(
            () => {
              this.deleteHeroSuccess(id);
            },
            (error) => console.log(error)
          )
        )
      )
    );
  });
}
