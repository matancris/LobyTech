import React, { useEffect, useState } from 'react'
import { newsService } from '../services/news.service';
import { NewsRssResponse } from '../../../types/Lobby';

export const NewsFlashes = () => {
    const [newsStrs, setNewsStrs] = useState<string[]>([])
    const [feedLogo, setFeedLogo] = useState('')

    useEffect(() => {
        const getData = async () => {
            try {
                const newsData: NewsRssResponse = await newsService.getRSSNews()
                const newTitles = newsData.items.map(item => item.title)
                
                // Only update if the news are different
                if (!areArraysEqual(newTitles, newsStrs)) {
                    console.log('Updating news - new content found');
                    setNewsStrs(newTitles)
                    setFeedLogo(newsData.feed.image)
                } else {
                    console.log('News are up to date');
                }
            } catch (err) {
                console.error('Failed to fetch RSS feed:', err);
            }
        }

        // Helper function to compare arrays
        const areArraysEqual = (arr1: string[], arr2: string[]) => {
            if (arr1.length !== arr2.length) return false;
            return arr1.every((item, index) => item === arr2[index]);
        }

        // Initial fetch
        getData()

        // Set up interval for subsequent fetches
        const intervalId = setInterval(() => {
            console.log('Checking for news updates...')
            getData()
        }, 1000 * 60 * 10) // Every 10 minutes

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId)
    }, []); // Empty dependency array since we're handling updates internally

    return (
        <section className='news-flashes'>
            <div>
                <img className='feed-logo' src={feedLogo} alt="Feed Logo" />
            </div>
            <div className="news-titles-container">
                <div className="news-animation-wrapper">
                    {newsStrs.map((str, idx) => (
                        <React.Fragment key={idx}>
                            <h1>{str}</h1>
                            {idx + 1 !== newsStrs.length && <span className="vertical-line-divider"></span>}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </section>
    )
}
