import HeaderSimple  from 'src/layouts/_common/header-simple';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function SimpleLayout({ children }: any) {
  return (
    <>
      <HeaderSimple />

      {children}
    </>
  );
}
