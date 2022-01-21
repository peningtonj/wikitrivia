import { Item, PlayedItem } from "../types/item";
import { createWikimediaImage } from "./image";

export function getRandomItem(deck: Item[], played: Item[]): Item {
  const playedYears = played.map((item): string => {
    return item.data;
  });
  let item: Item | undefined = undefined;
  let iterations = 0;

  const periods: [number, number][] = [
    [-100000, 1400],
    [1400, 1850],
    [1850, 1930],
    [1930, 2020],
  ];
  const [fromYear, toYear] = periods[
    Math.floor(Math.random() * periods.length)
  ];
  const avoidPeople = Math.random() > 0.5;

  while (item === undefined) {
    iterations += 1;

    if (iterations > 1000) {
      throw new Error(`Couldn't find item after ${iterations} iterations`);
    }

    const index = Math.floor(Math.random() * deck.length);
    const candidate = deck[index];

    deck.splice(index, 1);
    item = { ...candidate };
  }
  console.log(item)
  return item;
}

function date_sort(
  a: string,
  b: string
): number {
  var da = new Date(a);
  var db = new Date(b)
  var s = da.getTime() - db.getTime()
  return s
}

export function checkCorrect(
  played: PlayedItem[],
  item: Item,
  index: number
): { correct: boolean; delta: number } {
  const sorted = [...played, item].sort((a, b) => date_sort(a.data, b.data));
  const correctIndex = sorted.findIndex((i) => {
    return i.id === item.id;
  });

  if (index !== correctIndex) {
    return { correct: false, delta: correctIndex - index };
  }

  return { correct: true, delta: 0 };
}

export function preloadImage(url: string): HTMLImageElement {
  const img = new Image();
  img.src = createWikimediaImage(url);
  return img;
}
