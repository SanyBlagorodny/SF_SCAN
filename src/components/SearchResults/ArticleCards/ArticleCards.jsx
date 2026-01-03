import React, { useState, useEffect } from 'react';
import ArticleCard from './ArticleCard/ArticleCard';

import './ArticleCards.css';

import mock_article_1_picture from '../../../assets/mock_article_1_picture.png';
import mock_article_2_picture from '../../../assets/mock_article_2_picture.png';
import tariffs_icon_lamp from '../../../assets/tariffs_icon_lamp.svg';
import tariffs_icon_laptop from '../../../assets/tariffs_icon_laptop.svg';
import tariffs_icon_target from '../../../assets/tariffs_icon_target.svg';
import why_us_icon_magnifier from '../../../assets/why_us_icon_magnifier.svg';
import why_us_icon_shield from '../../../assets/why_us_icon_shield.svg';
import why_us_icon_watch from '../../../assets/why_us_icon_watch.svg';

const mockPictures = [
  mock_article_1_picture, 
  mock_article_2_picture,
  tariffs_icon_lamp,
  tariffs_icon_laptop,
  tariffs_icon_target,
  why_us_icon_magnifier,
  why_us_icon_shield,
  why_us_icon_watch
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
          picture: mockPictures[(index + Math.floor(Math.random() * mockPictures.length)) % mockPictures.length],
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