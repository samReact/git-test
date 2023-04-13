import { FC, useState } from 'react';
import {
  Grid,
  GridColumn,
  GridDataStateChangeEvent
} from '@progress/kendo-react-grid';
import { State, toODataString } from '@progress/kendo-data-query';

import { AvgFilterCell } from './AvgFilterCell';
import { ImgCell } from './ImgCell';
import { useBeersList } from '../hooks/useBeersList';

export const Home: FC = (): JSX.Element => {
  const [page, setPage] = useState<number>(1);
  const [abv, setAbv] = useState<number>(0);
  const [dataState, setDataState] = useState<State>({
    take: 25,
    skip: 0
  });

  const { beers, isLoading } = useBeersList(page, abv);

  const dataStateChange = (e: GridDataStateChangeEvent) => {
    const nextPage = e.dataState.skip! / 25 + 1;
    if (toODataString(e.dataState) !== toODataString(dataState)) {
      setDataState(e.dataState);
      setPage(nextPage);
    }
  };

  const filterChange = (event: any) => {
    setAbv(event.filter.filters[0].value);
    setPage(1);
  };

  return (
    <div className="container">
      <>
        {isLoading && (
          <div className="k-loading-mask">
            <span className="k-loading-text">Loading</span>
            <div className="k-loading-image" />
            <div className="k-loading-color" />
          </div>
        )}
        <Grid
          style={{
            height: '80vh'
          }}
          data={{
            data: beers,
            total: beers.length < 25 ? 25 * page : 25 * page + 1
          }}
          pageable
          filterable
          {...dataState}
          onDataStateChange={dataStateChange}
          onFilterChange={filterChange}
        >
          <GridColumn field="id" title="Id" filterable={false} width={50} />
          <GridColumn
            field="image_url"
            title="Image"
            cell={({ dataItem }) => <ImgCell src={dataItem.image_url} />}
            filterable={false}
          />
          <GridColumn field="name" title="Name" filterable={false} />
          <GridColumn
            field="abv"
            title="Abv %"
            filterCell={AvgFilterCell}
            filter="numeric"
          />
        </Grid>
      </>
    </div>
  );
};
