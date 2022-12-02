import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { HeroState } from './heroes.reducer';
import { Hero } from 'src/app/hero';

export const selectHeroes = (state: AppState) => state.heroes;

// export const selectHeroes = createFeatureSelector<AppState>('heroes')

export const selectAllHeroes = createSelector(
  selectHeroes,
  (state: HeroState) => state.heroes
);

export const selectSingleHero = createSelector(
  selectHeroes,
  (state: HeroState) => state.selectedHero
);
