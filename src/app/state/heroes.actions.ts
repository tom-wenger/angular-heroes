import { createAction, props } from '@ngrx/store';

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
