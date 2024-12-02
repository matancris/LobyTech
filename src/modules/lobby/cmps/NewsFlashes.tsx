import { useEffect, useState } from 'react'
import { newsService } from '../services/news.service';
import {  NewsRssResponse } from '../../../types/Lobby';

export const NewsFlashes = () => {
    const [newsStrs, setNewsStrs] = useState<string[]>([])
    const [currFlash, setCurrFlash] = useState('')

    useEffect(() => {
        const getData = async () => {
            const newsData: NewsRssResponse = await newsService.getRSSNews()
            setNewsStrs(newsData.items.map(item => item.title))
        }
        try {
        } catch (err) {
            console.error('Failed to fetch RSS feed:', err);
        }
        getData()
    }, []);

    useEffect(() => {
        let index = 0; // To keep track of the current news index
        const interval = setInterval(() => {
            setCurrFlash(newsStrs[index]);
            index = (index + 1); // Loop back to the start after the last news
            if (index >= newsStrs.length) {
                index = 0;
            }
        }, 7000);

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [newsStrs]);
    return (
        <section className='news-flashes'>
            <div>
                <h1>{currFlash}</h1>
            </div>
        </section>
    )
}
