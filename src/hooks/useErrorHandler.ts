import { useNavigate } from 'react-router-dom';
import { ServiceResponse } from '../api/types';
import { useAuth } from '../context/AuthContext';
import { useCallback } from 'react';

const useErrorHandler = () => {
  const { logOutUser } = useAuth()
  const navigate = useNavigate();

  const handle = useCallback((res: ServiceResponse) => {
    if (res.resData && res.resData.status === 401) {
      
      logOutUser()
      navigate("/login")
    }
  },[])

  return { handle };
}

export default useErrorHandler;