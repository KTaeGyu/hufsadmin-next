import { RollMenuObjectItem } from "../api/init/route";

class Cache {
  private static instance: Cache;
  // data
  private rollMenuObjectArray: RollMenuObjectItem[] | null = null;

  private constructor() {}

  static getInstance() {
    if (!Cache.instance) {
      Cache.instance = new Cache();
    }
    return Cache.instance;
  }
  // setter
  setRollMenuObjectArray(data?: RollMenuObjectItem[]) {
    this.rollMenuObjectArray = data || null;
  }
  // getter
  getRollMenuObjectArray() {
    return this.rollMenuObjectArray;
  }
}

const cache = Cache.getInstance();

export default cache;
