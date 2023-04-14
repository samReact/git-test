import { render, screen } from '@testing-library/react';
import { Home } from './pages/Home';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import nock from 'nock';
import { renderHook, waitFor } from '@testing-library/react';
import { useBeersList } from './hooks/useBeersList';

const beers = [
  { id: 1, name: 'heineken', abv: 4, img_url: 'www.img-1.ch' },
  { id: 2, name: 'corona', abv: 7, img_url: 'www.img-2.ch' }
];

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false
      }
    }
  });
  return ({ children }: any) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('HomePage', () => {
  let Wrapper = createWrapper();

  describe('Before fetch', () => {
    test('Should display a loader', async () => {
      render(
        <Wrapper>
          <Home />
        </Wrapper>
      );
      const loader = screen.getByTestId('loader');
      expect(loader).toBeInTheDocument();
    });
  });

  describe('After fetch', () => {
    beforeEach(() => {
      nock('https://api.punkapi.com')
        .get('/v2/beers?page=1&abv_gt=0&per_page=25')
        .reply(200, beers);
    });

    test('Sould get results from beer hook', async () => {
      const { result } = renderHook(() => useBeersList(), {
        wrapper: Wrapper
      });
      await waitFor(() => expect(result.current.isSuccess).toBe(true));
    });
    test('Should have grid with 4 columns', async () => {
      render(
        <Wrapper>
          <Home />
        </Wrapper>
      );

      const columns = screen.getAllByRole('columnheader');
      expect(columns[0]).toHaveAccessibleName('Id');
      expect(columns[1]).toHaveAccessibleName('Image');
      expect(columns[2]).toHaveAccessibleName('Name');
      expect(columns[3]).toHaveAccessibleName('Abv %');
    });
    test('Should display correct datas', async () => {
      render(
        <Wrapper>
          <Home />
        </Wrapper>
      );
      const beer1 = await screen.findByText('heineken');
      const beer2 = await screen.findByText('corona');
      expect(beer1).toBeInTheDocument();
      expect(beer2).toBeInTheDocument();
    });
  });
});
