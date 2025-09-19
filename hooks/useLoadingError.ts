import { useState, useCallback } from "react";

interface UseLoadingErrorReturn {
  isLoading: boolean;
  error: string | null;
  isSearching: boolean;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSearching: (searching: boolean) => void;
  clearError: () => void;
  executeWithLoading: <T>(
    asyncFunction: () => Promise<T>,
    options?: {
      onSuccess?: (result: T) => void;
      onError?: (error: Error) => void;
      errorMessage?: string;
    }
  ) => Promise<T | null>;
}

export const useLoadingError = (): UseLoadingErrorReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const setLoading = useCallback((loading: boolean) => {
    setIsLoading(loading);
  }, []);

  const setErrorState = useCallback((errorMessage: string | null) => {
    setError(errorMessage);
  }, []);

  const setSearching = useCallback((searching: boolean) => {
    setIsSearching(searching);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const executeWithLoading = useCallback(
    async <T>(
      asyncFunction: () => Promise<T>,
      options?: {
        onSuccess?: (result: T) => void;
        onError?: (error: Error) => void;
        errorMessage?: string;
      }
    ): Promise<T | null> => {
      try {
        setIsLoading(true);
        setError(null);
        
        const result = await asyncFunction();
        
        if (options?.onSuccess) {
          options.onSuccess(result);
        }
        
        return result;
      } catch (err) {
        const errorMessage = options?.errorMessage || 
          (err instanceof Error ? err.message : "An unknown error occurred");
        
        setError(errorMessage);
        
        if (options?.onError) {
          options.onError(err instanceof Error ? err : new Error(String(err)));
        }
        
        console.error("Error in executeWithLoading:", err);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return {
    isLoading,
    error,
    isSearching,
    setLoading,
    setError: setErrorState,
    setSearching,
    clearError,
    executeWithLoading,
  };
};
