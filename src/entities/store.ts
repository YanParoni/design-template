interface Store {
    id: number;
    name: string;
    domain: string;
    slug: string;
    games_count: number;
    image_background: string;
  }

  export class StoreInfo {
    store!: Store;
  }
  
 