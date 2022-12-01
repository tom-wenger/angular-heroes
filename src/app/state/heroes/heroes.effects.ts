import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as storeActions from '../heroes/heroes.actions';
import { HeroService } from 'src/app/hero.service';
import { Store } from '@ngrx/store';
import { selectAllHeroes } from './heroes.selector';
import { AppState } from '../app.state';
import { catchError, map, of, switchMap, tap } from 'rxjs';

@Injectable()
export class HeroEffects {
  constructor(private actions$: Actions, private heroService: HeroService) {}

  loadHeroes$ = createEffect(() =>
    this.actions$.pipe(
      //   tap((x) => console.log(x)),
      ofType(storeActions.loadHeroes),
      switchMap(() =>
        this.heroService.getHeroes().pipe(
          map((heroes) => storeActions.loadHeroesSuccess({ heroes: heroes })),
          catchError((error) => of(storeActions.loadHeroesFailure({ error })))
        )
      )
    )
  );

  addHeroes$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(storeActions.addHero),
        tap((x) => console.log(x))
        // switchMap((newHeroAction) => this.heroService.addHero(newHeroAction.name))
      ),
    { dispatch: false }
  );
}
