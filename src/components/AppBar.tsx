import { FC } from 'react';
import {
  AppBar as AppBarComponent,
  AppBarSection,
  Menu,
  MenuItem
} from '@progress/kendo-react-layout';
import { useNavigate } from 'react-router-dom';

export const AppBar: FC = (): JSX.Element => {
  const navigate = useNavigate();

  const onSelect = (event: any) => {
    navigate(event.item.data.route);
  };
  return (
    <AppBarComponent className="appBar">
      <AppBarSection>
        <h3 className="title">Git's beers</h3>
      </AppBarSection>
      <AppBarSection>
        <Menu onSelect={onSelect}>
          <MenuItem
            text="Our beers"
            data={{
              route: '/'
            }}
          />
          <MenuItem
            text="Part2"
            data={{
              route: '/part2'
            }}
          />
        </Menu>
      </AppBarSection>
    </AppBarComponent>
  );
};
