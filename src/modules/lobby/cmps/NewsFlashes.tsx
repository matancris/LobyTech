import React, { useEffect, useState } from 'react'
import { newsService } from '../services/news.service';
import { NewsRssResponse } from '../../../types/Lobby';

export const NewsFlashes = () => {
    const [newsStrs, setNewsStrs] = useState<string[]>([])
    const [feedLogo, setFeedLogo] = useState('')

    useEffect(() => {
        const getData = async () => {
            const newsData: NewsRssResponse = await newsService.getRSSNews()
            setNewsStrs(newsData.items.map(item => item.title))
            setFeedLogo(newsData.feed.image) // Assuming the RSS feed has a "image" field with the logo URL
        }
        try {
            getData()
        } catch (err) {
            console.error('Failed to fetch RSS feed:', err);
        }
    }, []);

    useEffect(() => {

        console.log("🚀 ~ NewsFlashes ~ newsStrs:", newsStrs)

    }, [newsStrs])

    return (
        <section className='news-flashes'>
            <div>
                <img src={feedLogo} alt="Feed Logo" /> {/* Assuming the RSS feed has an "image" field with the logo URL */}
            </div>
            <div className="news-titles-container">
                <div className="news-animation-wrapper">
                    {newsStrs.map((str, idx) => (
                        <React.Fragment key={idx}>
                            <h1 >{str}</h1>
                            {idx + 1 !== newsStrs.length && <span className="vertical-line-divider"></span>}
                        </React.Fragment>
                    ))}
                </div>
            </div>
            {/* <h1>{currFlash}</h1> */}
        </section>
    )
}
