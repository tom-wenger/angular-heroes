<!-- prettier-ignore-start -->

# mergeMap - switchMap - concatMap

| mergeMap     | switchMap    | concatMap |
| ------ | ------- | ----- |
| Beim emitten der äusseren Observable wird auf die innere Observable gewechselt. **(+ neue Subscription!)** | Beim emitten der äusseren Observable wird auf die innere Observable gewechselt. **(+ alte Subscription gecancelt!)** | Arbeitet alle Streams der inneren Observable in der richtigen Reihenfolge ab, bevor der nächste Stream vo der Äusseren bearbeitet wird.


<br>

## mergeMap

Macht beim emitten der äusseren Oberservable jedes mal eine neue Subscription

```ts
let intval = interval(1000);

const btn = document.querySelector<HTMLButtonElement>("#btn")!;
fromEvent(btn, "click")
  .pipe(
    map(() => "btn"),
    mergeMap((btn) => intval.pipe(map((i) => btn + i)))
  )
  .subscribe((x) => console.log(x));
```

## concatMap
``` ts
let intval = interval(1000).pipe(take(3));
const btn = document.querySelector<HTMLButtonElement>("#btn")!;
fromEvent(btn, "click")
  .pipe(
    map(() => "btn"),
    concatMap((btn) => intval.pipe(map((i) => btn + i)))
  )
  .subscribe((x) => console.log(x));

```


<!-- prettier-ignore-end -->
