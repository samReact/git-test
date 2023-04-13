import { DataResult } from '@progress/kendo-data-query';
import { useCallback, useEffect, useState } from 'react';

export const useBeersList = (page: number, abv: number) => {
  const [beers, setBeers] = useState<DataResult[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchBeers = useCallback(async () => {
    setIsLoading(true);
    const response = await fetch(
      `https://api.punkapi.com/v2/beers?page=${page}&abv_gt=${abv}&per_page=25`
    );
    const datas: Array<DataResult> = await response.json();
    setIsLoading(false);
    setBeers(datas);
  }, [abv, page]);

  useEffect(() => {
    fetchBeers();
  }, [page, abv, fetchBeers]);

  return { beers, isLoading };
};
