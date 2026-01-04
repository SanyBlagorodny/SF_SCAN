// API слой для поиска публикаций
const API_BASE_URL = 'https://gateway.scan-interfax.ru';

// Маппинг тональности
export const TONALITY_MAP = {
  'Любая': 'any',
  'Позитивная': 'positive',
  'Негативная': 'negative',
};

// Обратный маппинг для отображения
export const REVERSE_TONALITY_MAP = {
  'any': 'Любая',
  'positive': 'Позитивная',
  'negative': 'Негативная',
};

// Опции для селекта тональности
export const TONALITY_OPTIONS = [
  { value: 'Любая', label: 'Любая' },
  { value: 'Позитивная', label: 'Позитивная' },
  { value: 'Негативная', label: 'Негативная' },
];

export const searchAPI = {
  // Получение сводки по датам
  async getHistograms(searchParams) {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw new Error('Токен авторизации отсутствует');
      }

      const response = await fetch(`${API_BASE_URL}/api/v1/objectsearch/histograms`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(searchParams),
        credentials: 'omit',
      });

      if (!response.ok) {
        throw new Error(`Ошибка получения сводки: ${response.status}`);
      }

      const data = await response.json();
      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Ошибка при получении сводки',
      };
    }
  },

  // Поиск публикаций
  async searchPublications(searchParams) {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw new Error('Токен авторизации отсутствует');
      }

      const response = await fetch(`${API_BASE_URL}/api/v1/objectsearch`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(searchParams),
        credentials: 'omit',
      });

      if (!response.ok) {
        throw new Error(`Ошибка поиска: ${response.status}`);
      }

      const data = await response.json();
      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Ошибка при поиске публикаций',
      };
    }
  },

  // Получение текстов публикаций
  async getDocuments(documentIds) {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw new Error('Токен авторизации отсутствует');
      }

      const response = await fetch(`${API_BASE_URL}/api/v1/documents`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ ids: documentIds }),
        credentials: 'omit',
      });

      if (!response.ok) {
        throw new Error(`Ошибка получения документов: ${response.status}`);
      }

      const data = await response.json();
      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Ошибка при получении документов',
      };
    }
  },

  // Формирование параметров поиска
  formatSearchParams(params) {
    const {
      companyINN,
      tonality,
      documentCount,
      startDate,
      endDate,
      checkboxStates,
    } = params;

    return {
      issueDateInterval: {
        startDate: new Date(startDate).toISOString(),
        endDate: new Date(endDate).toISOString(),
      },
      searchContext: {
        targetSearchEntitiesContext: {
          targetSearchEntities: [
            {
              type: "company",
              sparkId: null,
              entityId: null,
              inn: companyINN,
              maxFullness: checkboxStates.maxCompleteness,
              inBusinessNews: checkboxStates.businessMentions,
            },
          ],
          onlyMainRole: checkboxStates.mainRole,
          tonality: TONALITY_MAP[tonality] || 'any',
          onlyWithRiskFactors: checkboxStates.riskFactorsOnly,
        },
      },
      attributeFilters: {
        excludeTechNews: !checkboxStates.includeMarketNews,
        excludeAnnouncements: !checkboxStates.includeAnnouncements,
        excludeDigests: !checkboxStates.includeNewsSummaries,
      },
      similarMode: "duplicates",
      limit: parseInt(documentCount),
      sortType: "sourceInfluence",
      sortDirectionType: "desc",
      intervalType: "month",
      histogramTypes: ["totalDocuments", "riskFactors"],
    };
  },
};
