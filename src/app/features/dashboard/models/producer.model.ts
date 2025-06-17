type ProducerModel = {
  producer: string;
  followingWin: number;
  previousWin: number;
  interval: number;
}

export type ProducerMaxWinIntervalModel = {
  min: ProducerModel[];
  max: ProducerModel[];
}
