import React, { useState, useEffect } from 'react';
import ArticleCard from './ArticleCard/ArticleCard';

import './ArticleCards.css';

import {
    mock_article_1_picture,
    mock_article_2_picture,
    mock_article_3_picture,
    mock_article_4_picture,
    mock_article_5_picture,
    mock_article_6_picture
} from '../../../assets';

const mockPictures = [
    mock_article_1_picture,
    mock_article_2_picture,
    mock_article_3_picture,
    mock_article_4_picture,
    mock_article_5_picture,
    mock_article_6_picture
];

function ArticleCards({ documentsData, onLoadMore, hasMore }) {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        if (documentsData && Array.isArray(documentsData)) {
            const uniqueArticles = new Map();
            documentsData.forEach(doc => {
                if (doc.ok && doc.ok.url) {
                    uniqueArticles.set(doc.ok.url, doc);
                }
            });

            const transformedArticles = Array.from(uniqueArticles.values()).map((doc, index) => {
                const uniqueId = doc.ok.id || `${doc.ok.url}-${index}`;
                
                // Simple picture assignment without state updates in render
                const pictureIndex = index % mockPictures.length;
                
                return {
                    id: uniqueId,
                    date: new Date(doc.ok.issueDate).toLocaleDateString('ru-RU'),
                    url: doc.ok.url,
                    sourceName: doc.ok.source.name,
                    isTechNews: doc.ok.attributes.isTechNews,
                    isAnnouncement: doc.ok.attributes.isAnnouncement,
                    isDigest: doc.ok.attributes.isDigest,
                    title: doc.ok.title.text,
                    content: doc.ok.content.markup,
                    wordCount: doc.ok.attributes.wordCount,
                    picture: mockPictures[pictureIndex],
                };
            });

            setArticles(transformedArticles);
        }
    }, [documentsData]);

    const handleShowMore = () => {
        if (onLoadMore) {
            onLoadMore();
        }
    };

    return (
        <div className="article-cards-block">
            <h2 className="h2-search-results-page-articles">Список документов</h2>
            <div className="article-cards">
                {articles.map((article) => (
                    <ArticleCard key={article.id} {...article} />
                ))}
            </div>
            {hasMore && (
                <div className="button-div">
                    <button className="button show-more" onClick={handleShowMore}>
                        Показать больше
                    </button>
                </div>
            )}
        </div>
    );
}

export default ArticleCards;