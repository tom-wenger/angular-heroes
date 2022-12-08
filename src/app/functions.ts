import { filter, map, Observable } from 'rxjs';

export function filterHero(heroName: Observable<string>): Observable<string> {
  return heroName.pipe(
    map((name) => name.trim()),
    filter((name) => Boolean(name))
  );
}
