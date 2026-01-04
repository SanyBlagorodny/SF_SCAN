import React, { useState, useEffect } from 'react';
import { authAPI } from '../../../../api/auth';
import './UserActions.css';
import loading_icon from '../../../../assets/loading_icon.svg';

const UserActions = () => {
    const [usedCompanyCount, setUsedCompanyCount] = useState(0);
    const [companyLimit, setCompanyLimit] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCompanyInfo = async () => {
            setIsLoading(true);
            setError('');
            
            try {
                const result = await authAPI.getAccountInfo();
                
                if (result.success) {
                    setUsedCompanyCount(result.data.usedCompanyCount);
                    setCompanyLimit(result.data.companyLimit);
                } else {
                    setError(result.error);
                }
            } catch (error) {
                setError('Ошибка при загрузке данных');
            } finally {
                setIsLoading(false);
            }
        };

        fetchCompanyInfo();
    }, []);

    if (isLoading) {
        return (
            <div className="user-actions-rectangle">
                <img src={loading_icon} alt="Loading" className="loading-icon" />
                <span>Загрузка данных...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="user-actions-rectangle">
                <div className="company-info error">
                    <span>{error}</span>
                </div>
            </div>
        );
    }

    return (
        <div className="user-actions-rectangle">
            <div className="user-actions-data">
                <div className="action-item">Использовано компаний</div>
                <div className="number-item used-companies-number">{usedCompanyCount}</div>
                <div className="action-item">Лимит по компаниям</div>
                <div className="number-item limit-companies-number">{companyLimit}</div>
            </div>
        </div>
    );
};

export default UserActions;
