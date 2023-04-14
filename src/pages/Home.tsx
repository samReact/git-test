import { FC, useState } from 'react';
import {
  Grid,
  GridColumn,
  GridDataStateChangeEvent
} from '@progress/kendo-react-grid';
import { State, toODataString } from '@progress/kendo-data-query';
import { Loader } from '@progress/kendo-react-indicators';

import { AvgFilterCell } from '../components/AvgFilterCell';
import { ImgCell } from '../components/ImgCell';
import { useBeersList } from '../hooks/useBeersList';

export const Home: FC = (): JSX.Element => {
  const [dataState, setDataState] = useState<State>({
    take: 25,
    skip: 0
  });

  const { data, isLoading, isFetching, page, setAbv, setPage } = useBeersList();

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
    setDataState({ take: 25, skip: 0 });
  };

  return (
    <div className="container">
      {isLoading ? (
        <div
          className="row"
          data-testid="loader"
          style={{
            width: '50%'
          }}
        >
          <div className="col-4">
            <Loader size="large" type={'infinite-spinner'} />
          </div>
        </div>
      ) : (
        <>
          {isFetching && (
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
              data: data,
              total: data.length < 25 ? 25 * page : 25 * page + 1
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
      )}
    </div>
  );
};
