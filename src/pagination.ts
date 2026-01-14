export const PER_PAGE = 15;

export default class Pagination {
  private readonly perPage: number;
  private page: number;

  constructor(perPage: number = PER_PAGE) {
    this.perPage = perPage;
    this.page = 1;
  }

  public get current(): number {
    return this.page;
  }

  public reset(): void {
    this.page = 1;
  }

  public next(): number {
    this.page += 1;
    return this.page;
  }

  // Returns true when we've reached or passed the last page based on totalHits
  public isEnd(totalHits: number): boolean {
    return this.page * this.perPage >= totalHits;
  }
}
