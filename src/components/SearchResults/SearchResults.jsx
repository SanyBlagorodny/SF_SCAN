import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { searchAPI } from '../../api/search';

import './SearchResults.css';
import GeneralSummaryTable from './GeneralSummaryTable/GeneralSummaryTable';
import ArticleCards from './ArticleCards/ArticleCards';
import search_results_large_picture from '../../assets/search_results_large_picture.svg';

const SearchResults = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [searchData, setSearchData] = useState(null);
  const [documentsData, setDocumentsData] = useState([]);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [publicationIds, setPublicationIds] = useState([]);
  const [nextIndex, setNextIndex] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  const navigate = useNavigate();

  const loadMoreDocuments = useCallback(async (ids, startFrom) => {
    const start = startFrom !== undefined ? startFrom : nextIndex;
    const slice = ids.slice(start, start + 10);

    if (slice.length === 0) return;

    try {
      setIsLoading(true);

      const documentsResult = await searchAPI.getDocuments(slice);
      if (!documentsResult.success) {
        throw new Error(documentsResult.error);
      }

      const newDocuments = documentsResult.data;
      setDocumentsData(prev => [...prev, ...newDocuments]);

      const newIndex = start + slice.length;
      setNextIndex(newIndex);
      setHasMore(newIndex < ids.length);
    } catch (error) {
      console.error('Ошибка при загрузке документов:', error.message);
      setIsError(true);
      setErrorMessage(error.message || 'Ошибка при загрузке документов');
    } finally {
      setIsLoading(false);
    }
  }, [nextIndex]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      const searchParams = location.state?.searchParams;
      if (!searchParams) {
        console.error('Search parameters are missing.');
        setIsLoading(false);
        setIsError(true);
        setErrorMessage('Параметры поиска отсутствуют');
        return;
      }

      setIsLoading(true);
      setIsError(false);

      try {
        // Получение сводки по датам
        const histogramResult = await searchAPI.getHistograms(searchParams);
        if (!histogramResult.success) {
          throw new Error(histogramResult.error);
        }

        setSearchData(histogramResult.data);

        // Получение ID публикаций
        const publicationsResult = await searchAPI.searchPublications(searchParams);
        if (!publicationsResult.success) {
          throw new Error(publicationsResult.error);
        }

        const ids = publicationsResult.data.items.map(item => item.encodedId);
        setPublicationIds(ids);
        setHasMore(ids.length > 0);

        if (ids.length > 0) {
          await loadMoreDocuments(ids, 0);
        }
      } catch (error) {
        console.error("Ошибка при выполнении запроса:", error.message);
        setIsError(true);
        setErrorMessage(error.message || 'Произошла ошибка при загрузке данных');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearchResults();
  }, [location.state?.searchParams, loadMoreDocuments]);

  const handleLoadMore = () => {
    if (publicationIds.length > 0 && hasMore && !isLoading) {
      loadMoreDocuments(publicationIds, nextIndex);
    }
  };

  return (
    <div className="search-results-content">
      <div className="search-results-header">
        <h1 className="h1-search-results-page">Ищем. Скоро будут результаты</h1>
        <p className="p-search-results-page">
          поиск может занять некоторое время, просим сохранять терпение
        </p>
      </div>

      <img className="search-results-large-picture" src={search_results_large_picture} alt="Search results illustration" />

      <div className="search-results-main">
        {isError && (
          <div className="error-message">
            <h3>Произошла ошибка</h3>
            <p>{errorMessage}</p>
            <button onClick={() => navigate('/search')} className="back-to-search-button">
              Вернуться к поиску
            </button>
          </div>
        )}

        {!isLoading && !isError && (
          <>
            <GeneralSummaryTable 
              searchData={searchData} 
              isLoading={isLoading} 
              setIsLoading={setIsLoading} 
              isError={isError}
            />
            <ArticleCards 
              documentsData={documentsData} 
              onLoadMore={handleLoadMore} 
              hasMore={hasMore} 
            />
          </>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
