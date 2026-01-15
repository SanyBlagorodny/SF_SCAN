import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { searchAPI } from '../../api/search';

import './Search.css';
import CompanyINN from './CompanyINN/CompanyINN';
import Tonality from './Tonality/Tonality';
import DocumentCount from './DocumentCount/DocumentCount';
import DateInput from './DateInput/DateInput';
import CheckboxBlock from './CheckboxBlock/CheckboxBlock';

import search_page_large_picture from "../../assets/search_page_large_picture.svg"
import search_page_small_picture_folders from "../../assets/search_page_small_picture_folders.svg"
import search_page_small_picture_sheet from "../../assets/search_page_small_picture_sheet.svg"

const Search = () => {
  const [companyINN, setCompanyINN] = useState('');
  const [tonality, setTonality] = useState('Любая');
  const [documentCount, setDocumentCount] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isInnValid, setIsInnValid] = useState(false);
  const [isDocumentCountValid, setIsDocumentCountValid] = useState(false);
  const [isDateValid, setIsDateValid] = useState(false);
  const [checkboxStates, setCheckboxStates] = useState({
    maxCompleteness: true,
    businessMentions: true,
    mainRole: true,
    riskFactorsOnly: false,
    includeMarketNews: false, 
    includeAnnouncements: true,
    includeNewsSummaries: false,
  });

  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const isValid =
      companyINN &&
      documentCount &&
      startDate &&
      endDate &&
      isInnValid &&
      isDocumentCountValid &&
      isDateValid;

    setIsFormValid(isValid);
  }, [companyINN, documentCount, startDate, endDate, isInnValid, isDocumentCountValid, isDateValid]);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckboxStates((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!isFormValid) {
      return;
    }

    const searchParams = searchAPI.formatSearchParams({
      companyINN,
      tonality,
      documentCount,
      startDate,
      endDate,
      checkboxStates,
    });

    navigate('/results', { state: { searchParams: searchParams } });
  };
  
  return (
    <div className="search-content">

      <div className="search-title-block">
        <div className="search-title-text">
          <h1 className="h1-search-page">Найдите необходимые данные в пару кликов.</h1>
          <p className="p-search-page-title-block">Задайте параметры поиска. Чем больше заполните, тем точнее поиск</p>
        </div>
        <img className="search-page-small-picture-sheet" src={search_page_small_picture_sheet} alt="Paper" />
        <img className="search-page-small-picture-folders" src={search_page_small_picture_folders} alt="Folders" />
      </div>

      <div className="search-block">
        <form onSubmit={handleSubmit} className="search-form">

          <div className="left-part-search-form">
            <CompanyINN
              companyINN={companyINN}
              setCompanyINN={setCompanyINN}
              setIsInnValid={setIsInnValid}
            />
            <Tonality tonality={tonality} setTonality={setTonality} />
            <DocumentCount
              documentCount={documentCount}
              setDocumentCount={setDocumentCount}
              setIsDocumentCountValid={setIsDocumentCountValid}
            />
            <DateInput
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
              setIsDateValid={setIsDateValid}
            />
          </div>

          <div className="right-part-search-form">
            <CheckboxBlock
              checkboxStates={checkboxStates}
              handleCheckboxChange={handleCheckboxChange}
            />
            <div className="search-button-container">
              <button 
                type="submit" 
                className={`search-button ${isFormValid ? 'active' : ''}`}
                disabled={!isFormValid}
              >
                Поиск
              </button>
              <div className="search-required-note">
                * Обязательные к заполнению поля
              </div>
            </div>
          </div>

        </form>

        <img className="search-page-large-picture" src={search_page_large_picture} alt="Search" />
      </div>  
    </div>
  );
};

export default Search;