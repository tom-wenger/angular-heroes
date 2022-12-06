import { createAction, props } from '@ngrx/store';
import { Hero } from 'src/app/hero';

//ADD
export const addHero = createAction(
  '[Heroes] Add Hero',
  props<{ name: string }>()
);
export const addHeroSuccess = createAction(
  '[Heroes API] Add Hero Success',
  props<Hero>()
);
export const addHeroFailure = createAction(
  '[Heroes API] Add Hero Failure',
  props<{ error: string }>()
);
//DELETE
export const deleteHero = createAction(
  '[Heroes] Delete Hero',
  props<{ id: number }>()
);
export const deleteHeroSuccess = createAction(
  '[Heroes API] Delete Hero Success',
  props<{ id: number }>()
);
export const deleteHeroFailure = createAction(
  '[Heroes API] Delete Hero Failure',
  props<{ error: string }>()
);
//UPDATE
export const updateHero = createAction(
  '[Heroes] Update Hero',
  props<{ id: number; name: string }>()
);
export const updateHeroSuccess = createAction(
  '[Heroes API] Update Hero Success',
  props<{ id: number; name: string }>()
);
export const updateHeroFailure = createAction(
  '[Heroes API] Update Hero Failure',
  props<{ error: string }>()
);
//LOAD ALL
export const loadHeroes = createAction('[Heros API] Load Heroes');
export const loadHeroesSuccess = createAction(
  '[Heroes API] Heroes Load Success',
  props<{ heroes: Hero[] }>()
);
export const loadHeroesFailure = createAction(
  '[Heroes API] Heroes Load Failure',
  props<{ error: string }>()
);
//LOAD SINGLE HERO
export const loadSingleHero = createAction(
  '[Heros API] Load Single Hero',
  props<{ id: number }>()
);
export const loadSingleHeroSuccess = createAction(
  '[Heroes API] Single Hero Load Success',
  props<Hero>()
);
export const loadSingleHeroFailure = createAction(
  '[Heroes API] Single Hero Load Failure',
  props<{ error: string }>()
);
//EMPTY Selected Hero
export const emptySelectedHero = createAction(
  '[Selected Hero] empty selected Hero field'
);
