export interface ManagerMsg {
    id?: string;
    text: string;
    timestamp: Date;
}


export type NewsRssResponse = {
    status: string;
    feed: {
      url: string;
      title: string;
      link: string;
      author: string;
      description: string;
      image: string;
    };
    items: newsItem[];
  };

  export type newsItem  = {
    title: string;
    pubDate: string;
    link: string;
    guid: string;
    author: string;
    thumbnail: string;
    description: string;
    content: string;
    enclosure: Record<string, unknown>;
    categories: string[];
  }

  export interface MediaState {
    [key: string]: {
        photoSrc: string | null;
        videoSrc: string | null;
        audioSrc: string | null;
        currMediaType: "image" | "video" | "audio" | null;
    };
}