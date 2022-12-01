import { createAction, props } from '@ngrx/store';
import { Hero } from 'src/app/hero';

export const addHero = createAction(
  '[Heros] Add Hero',
  props<{ name: string }>()
);
export const deleteHero = createAction(
  '[Heros] Delete Hero',
  props<{ id: number }>()
);
export const updateHero = createAction(
  '[Heros] Update Hero',
  props<{ id: number; name: string }>()
);
export const loadHeroes = createAction('[Heros] Load Heroes');
export const loadHeroesSuccess = createAction(
  '[Heroes API] Heroes Load Success',
  props<{ heroes: Hero[] }>()
);
export const loadHeroesFailure = createAction(
  '[Heros API] Heroes Load Failure',
  props<{ error: string }>()
);
