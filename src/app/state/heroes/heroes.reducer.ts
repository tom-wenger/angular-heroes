import { createReducer, on } from '@ngrx/store';
import * as actions from './heroes.actions';
import { Hero } from '../../hero';

// TODO:
// Add an interface like that and add app state
// https://www.youtube.com/watch?v=kx0VTgTtSBg&t=559s
//

export interface HeroState {
  heroes: Hero[];
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
  error: null,
  status: 'pending',
};
let id = 21;

export const heroesReducer = createReducer(
  initialState,
  //ADD
  on(actions.addHero, (state, { name }) => {
    return { ...state, heroes: [...state.heroes, { id: id++, name: name }] };
  }),
  //DELETE
  on(actions.deleteHero, (state, { id }) => {
    return { ...state, heroes: state.heroes.filter((hero) => hero.id !== id) };
  }),
  //UPDATE
  on(actions.updateHero, (state, { id, name }) => {
    return {
      ...state,
      heroes: state.heroes.map((hero) =>
        hero.id === id ? { id, name: name } : hero
      ),
    };
  }),
  //LOAD
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
  }))
);
