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

  //LOAD ALL
  loadHeroes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(storeActions.loadHeroes),
      switchMap(() =>
        this.heroService.getHeroes().pipe(
          map((heroes) => storeActions.loadHeroesSuccess({ heroes: heroes })),
          // tap((x) => {
          //   throw new Error('sdff');
          // }),
          catchError((error) => of(storeActions.loadHeroesFailure({ error })))
        )
      )
    )
  );

  //LOAD SINGLE HERO
  loadSingleHero$ = createEffect(() =>
    this.actions$.pipe(
      ofType(storeActions.loadSingleHero),
      switchMap((loadSingleHeroAction) =>
        this.heroService.getHero(loadSingleHeroAction.id).pipe(
          map((hero) => storeActions.loadSingleHeroSuccess(hero)),

          catchError((error) =>
            of(storeActions.loadSingleHeroFailure({ error }))
          )
        )
      )
    )
  );

  // ADD
  addHeroes$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(storeActions.addHero),
        switchMap((newHeroAction) =>
          this.heroService.addHero(newHeroAction.name).pipe(
            map((newHero) =>
              storeActions.addHeroSuccess({
                id: newHero.id,
                name: newHero.name,
              })
            ),
            catchError((error) => of(storeActions.addHeroFailure({ error })))
          )
        )
      )
    // { dispatch: false }
  );

  // DELETE
  deleteHeroes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(storeActions.deleteHero),
      switchMap((deleteHeroAction) =>
        this.heroService.deleteHero(deleteHeroAction.id).pipe(
          map(() =>
            storeActions.deleteHeroSuccess({ id: deleteHeroAction.id })
          ),
          catchError((error) => of(storeActions.deleteHeroFailure({ error })))
        )
      )
    )
  );

  // UPDATE
  updateHeroes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(storeActions.updateHero),
      switchMap((updateHeroAction) =>
        this.heroService
          .updateHero({ id: updateHeroAction.id, name: updateHeroAction.name })
          .pipe(
            map(() =>
              storeActions.updateHeroSuccess({
                id: updateHeroAction.id,
                name: updateHeroAction.name,
              })
            ),
            catchError((error) => of(storeActions.updateHeroFailure({ error })))
          )
      )
    )
  );
}
