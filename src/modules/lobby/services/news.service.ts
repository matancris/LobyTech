import { NewsRssResponse } from "../../../types/Lobby";

const BASE_URL = 'https://www.ynet.co.il/Integration/StoryRss1854.xml'

async function getRSSNews() {
    const response = await fetch(
      `https://api.rss2json.com/v1/api.json?rss_url=${BASE_URL}`
    );
    const data = await response.json();
    return data as NewsRssResponse
  };


  export const newsService = {
    getRSSNews
  }