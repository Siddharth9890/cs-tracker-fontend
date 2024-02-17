// @mui
import Box from '@mui/material/Box';
// types
// import { any } from 'src/types/user';
//
import UserCard from './user-card';

// ----------------------------------------------------------------------

type Props = {
  users: any[];
};

export default function UserCardList({ users }: any) {
  return (
    <Box
      gap={3}
      display="grid"
      gridTemplateColumns={{
        xs: 'repeat(1, 1fr)',
        sm: 'repeat(2, 1fr)',
        md: 'repeat(3, 1fr)',
      }}
    >
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </Box>
  );
}
