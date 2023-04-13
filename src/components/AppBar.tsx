import { FC } from 'react';
import {
  AppBar as AppBarComponent,
  AppBarSection
} from '@progress/kendo-react-layout';

export const AppBar: FC = (): JSX.Element => {
  return (
    <AppBarComponent className="appBar">
      <AppBarSection>
        <h3 className="title">Git's beers</h3>
      </AppBarSection>
    </AppBarComponent>
  );
};
