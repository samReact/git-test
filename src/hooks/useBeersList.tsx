import { useCallback, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useBeersList = () => {
  const [page, setPage] = useState<number>(1);
  const [abv, setAbv] = useState<number>(0);

  const fetchBeers = useCallback(async (page: number, abv: number) => {
    const response = await axios(
      `https://api.punkapi.com/v2/beers?page=${page}&abv_gt=${abv}&per_page=25`
    );
    const datas = response.data;
    return datas;
  }, []);

  const { isLoading, data, isFetching, isPreviousData, isSuccess } = useQuery({
    queryKey: ['projects', page, abv],
    queryFn: () => fetchBeers(page, abv),
    keepPreviousData: true
  });

  return {
    data,
    isLoading,
    isFetching,
    page,
    abv,
    setPage,
    setAbv,
    isPreviousData,
    isSuccess
  };
};
