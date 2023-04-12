import { useQuery } from '@tanstack/react-query';
import { Grid, GridColumn } from '@progress/kendo-react-grid';

const API_ROOT = 'https://api.punkapi.com/v2/beers';

const Image = ({ src }: any) => {
  return (
    <td>
      <img src={src} alt="a beer" width={50} />
    </td>
  );
};

export const Home = () => {
  const { isSuccess, data } = useQuery({
    queryKey: ['beers'],
    queryFn: async () => {
      const response = await fetch(API_ROOT);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    }
  });

  if (isSuccess) {
    console.log(data);
  }
  return (
    <Grid
      style={{
        height: '50vh'
      }}
      data={data}
    >
      <GridColumn field="name" title="Name" width="350px" />
      <GridColumn
        field="image_url"
        title="Image"
        cell={({ dataItem }) => <Image src={dataItem.image_url} />}
      />
      <GridColumn field="abv" title="Abv" />
    </Grid>
  );
};
