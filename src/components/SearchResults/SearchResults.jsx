import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

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
  const [publicationIds, setPublicationIds] = useState([]);
  const [nextIndex, setNextIndex] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      const searchParams = location.state?.searchParams;
      if (!searchParams) {
        console.error('Search parameters are missing.');
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setIsError(false);

      try {
        const histogramResponse = await fetch('https://gateway.scan-interfax.ru/api/v1/objectsearch/histograms', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`, 
          },
          body: JSON.stringify(searchParams),
          credentials: 'omit',
        });

        if (!histogramResponse.ok) {
          throw new Error(`HTTP error! status: ${histogramResponse.status}`);
        }

        const histogramData = await histogramResponse.json();

        const publicationIdsResponse = await fetch('https://gateway.scan-interfax.ru/api/v1/objectsearch', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          },
          body: JSON.stringify(searchParams),
          credentials: 'omit',
        });

        if (!publicationIdsResponse.ok) {
          throw new Error(`HTTP error! status: ${publicationIdsResponse.status}`);
        }

        const publicationIdsData = await publicationIdsResponse.json();
        const ids = publicationIdsData.items.map(item => item.encodedId);

        console.log("количество публикаций:", ids.length);

        setSearchData(histogramData);
        setPublicationIds(ids);
        setHasMore(ids.length > 0);

        if (ids.length > 0) {
          await loadMoreDocuments(ids, 0);
        }
      } catch (error) {
        console.error("Ошибка при выполнении запроса:", error.message);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearchResults();

  }, [JSON.stringify(location.state?.searchParams)]);

  const loadMoreDocuments = async (ids, startFrom) => {
    const start = startFrom !== undefined ? startFrom : nextIndex;
    const slice = ids.slice(start, start + 10);

    if (slice.length === 0) {
      setHasMore(false);
      return;
    }

    try {
      setIsLoading(true);

      const documentsResponse = await fetch('https://gateway.scan-interfax.ru/api/v1/documents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify({ ids: slice }),
        credentials: 'omit',
      });

      if (!documentsResponse.ok) {
        throw new Error(`HTTP error! status: ${documentsResponse.status}`);
      }

      const newDocuments = await documentsResponse.json();
      setDocumentsData(prev => [...prev, ...newDocuments]);

      const newIndex = start + slice.length;
      setNextIndex(newIndex);
      if (newIndex >= ids.length) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Ошибка при загрузке документов:", error.message);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (publicationIds.length > 0 && hasMore && !isLoading) {
      loadMoreDocuments(publicationIds, nextIndex);
    }
  };


  return (
    <div className="search-results-content">
      {isLoading && (
        <>
          <div className="search-results-title-block">
            <div className="search-results-title-text">
              <h1 className="h1-search-results-page">Ищем. Скоро будут результаты</h1>
              <p className="p-search-results-page-title-block">Поиск может занять некоторое время, просим сохранять терпение.</p>
            </div>
            <img className="search-results-large-picture" src={search_results_large_picture} alt="Search results picture" />
          </div>
          <GeneralSummaryTable searchData={searchData} isLoading={isLoading} setIsLoading={setIsLoading}/>
          </>
      )}
      
      {!isLoading && isError && (
        <>
          <GeneralSummaryTable searchData={searchData} isLoading={isLoading} setIsLoading={setIsLoading} isError={isError}/>
        </>
      )}

      {!isLoading && !isError && (
        <>
          <GeneralSummaryTable searchData={searchData} isLoading={isLoading} setIsLoading={setIsLoading} isError={isError}/>
          <ArticleCards documentsData={documentsData} onLoadMore={handleLoadMore} hasMore={hasMore} />
        </>
      )}
    </div>
  );
}

export default SearchResults;

