interface PlatformRequirements {
  minimum: string;
  recommended: string;
}

interface Platform {
  id: number;
  slug: string;
  name: string;
}

export class PlatformInfo {
  platform!: Platform;
  released_at!: string;
  requirements!: PlatformRequirements;
}
