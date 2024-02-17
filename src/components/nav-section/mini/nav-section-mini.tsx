import { memo } from 'react';
import Stack from '@mui/material/Stack';
//
// import { any, any, any } from '../types';
import { navMiniConfig } from '../config';
import NavList from './nav-lists';

// ----------------------------------------------------------------------

function NavSectionMini({ data, config, sx, ...other }: any) {
  return (
    <Stack sx={sx} {...other}>
      {data.map((group, index) => (
        <Group key={group.subheader || index} items={group.items} config={navMiniConfig(config)} />
      ))}
    </Stack>
  );
}

export default memo(NavSectionMini);

// ----------------------------------------------------------------------

type Props = {
  items: any[];
  config: any;
};

function Group({ items, config }: any) {
  return (
    <>
      {items.map((list) => (
        <NavList
          key={list.title + list.path}
          data={list}
          depth={1}
          hasChild={!!list.children}
          config={config}
        />
      ))}
    </>
  );
}
