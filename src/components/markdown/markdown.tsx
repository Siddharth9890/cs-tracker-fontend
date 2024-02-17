// utils
import 'src/utils/highlight';
import ReactMarkdown from 'react-markdown';
// markdown plugins
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
// @mui
import Link from '@mui/material/Link';
// routes
import { RouterLink } from 'src/routes/components/router-link';
//
import Image from '../image/image';
//
import StyledMarkdown from './styles';
// import { any } from './types';

// ----------------------------------------------------------------------

export default function Markdown({ sx, ...other }: any) {
  return (
    <StyledMarkdown sx={sx}>
      <ReactMarkdown
        rehypePlugins={[rehypeRaw, rehypeHighlight, [remarkGfm, { singleTilde: false }]]}
        components={components}
        {...other}
      />
    </StyledMarkdown>
  );
}

// ----------------------------------------------------------------------

const components = {
  img: ({ ...any }) => <Image alt={any.alt} ratio="16/9" sx={{ borderRadius: 2 }} {...any} />,
  a: ({ ...any }) => {
    const isHttp = any.href.includes('http');

    return isHttp ? (
      <Link target="_blank" rel="noopener" {...any} />
    ) : (
      <Link component={RouterLink} href={any.href} {...any}>
        {any.children}
      </Link>
    );
  },
};
