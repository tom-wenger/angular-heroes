import { createReducer, on } from '@ngrx/store';
import * as actions from './heroes.actions';
import { Hero } from '../../hero';

export interface HeroState {
  heroes: Hero[];
  selectedHero: Hero | null;
  error: string | null;
  status: 'pending' | 'loading' | 'error' | 'success';
}

export const initialState: HeroState = {
  // heroes: [
  //   { id: 12, name: 'Dr. Nice!' },
  //   { id: 13, name: 'Bombasto' },
  //   { id: 14, name: 'Celeritas' },
  //   { id: 15, name: 'Magneta' },
  //   { id: 16, name: 'RubberMan' },
  //   { id: 17, name: 'Dynama' },
  //   { id: 18, name: 'Dr. IQ' },
  //   { id: 19, name: 'Magma' },
  //   { id: 20, name: 'Tornado' },
  // ],
  heroes: [],
  selectedHero: null,
  error: null,
  status: 'pending',
};
let id = 21;

export const heroesReducer = createReducer(
  initialState,
  //ADD
  on(actions.addHero, (state) => ({ ...state })),
  //ADD SUCCESS
  on(actions.addHeroSuccess, (state, { id, name }) => {
    return { ...state, heroes: [...state.heroes, { id: id, name: name }] };
  }),
  //ADD FAILURE
  on(actions.addHeroFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error',
  })),
  //DELETE
  on(actions.deleteHero, (state) => ({ ...state })),
  //DELETE SUCCESS
  on(actions.deleteHeroSuccess, (state, { id }) => {
    return { ...state, heroes: state.heroes.filter((hero) => hero.id !== id) };
  }),
  //DELETE FAILURE
  on(actions.deleteHeroFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error',
  })),
  //UPDATE
  on(actions.updateHero, (state) => ({ ...state })),
  //UPDATE SUCESS
  on(actions.updateHero, (state, { id, name }) => {
    return {
      ...state,
      heroes: state.heroes.map((hero) =>
        hero.id === id ? { id, name: name } : hero
      ),
    };
  }),
  //UPDATE FAILURE
  on(actions.updateHeroFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error',
  })),
  //LOAD ALL
  on(actions.loadHeroes, (state) => ({ ...state, status: 'pending' })),
  //LOAD SUCCESS
  on(actions.loadHeroesSuccess, (state, { heroes }) => ({
    ...state,
    heroes: heroes,
    error: null,
    status: 'success',
  })),
  //LOAD FAILURE
  on(actions.loadHeroesFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error',
  })),
  //LOAD SINGLE
  on(actions.loadSingleHero, (state) => ({ ...state, status: 'pending' })),
  //LOAD SUCCESS
  on(actions.loadSingleHeroSuccess, (state, hero: Hero) => ({
    ...state,
    selectedHero: hero,
    error: null,
    status: 'success',
  })),
  //LOAD FAILURE
  on(actions.loadSingleHeroFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error',
  })),
  //Empty Selected Hero
  on(actions.emptySelectedHero, (state) => ({
    ...state,
    selectedHero: null,
  }))
);
