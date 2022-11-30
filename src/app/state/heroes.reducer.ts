import { createReducer, on } from '@ngrx/store';
import { addHero, deleteHero, updateHero } from './heroes.actions';
import { Hero } from '../hero';

// export interface State {
//   names: Name[];
// }

export const initialState: Hero[] = [
  { id: 12, name: 'Dr. Nice!' },
  { id: 13, name: 'Bombasto' },
  { id: 14, name: 'Celeritas' },
  { id: 15, name: 'Magneta' },
  { id: 16, name: 'RubberMan' },
  { id: 17, name: 'Dynama' },
  { id: 18, name: 'Dr. IQ' },
  { id: 19, name: 'Magma' },
  { id: 20, name: 'Tornado' },
];

let id = 21;

export const heroesReducer = createReducer(
  initialState,
  on(addHero, (state, { name }) => {
    return [...state, { id: id++, name: name }];
  }),
  on(deleteHero, (state, { id }) => {
    return state.filter((hero) => hero.id !== id);
  }),
  on(updateHero, (state, { id, name }) => {
    // return state.filter((hero) => hero.id !== id);
    return state.map((hero) => (hero.id === id ? { id, name: name } : hero));
  })
);

// on(increment, (state) => state + 1),
