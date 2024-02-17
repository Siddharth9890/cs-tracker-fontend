// @mui
import Pagination, { paginationClasses } from '@mui/material/Pagination';
// types
// import { any } from 'src/types/product';
//
import ProductReviewItem from './product-review-item';

// ----------------------------------------------------------------------

type Props = {
  reviews: any[];
};

export default function ProductReviewList({ reviews }: any) {
  return (
    <>
      {reviews.map((review) => (
        <ProductReviewItem key={review.id} review={review} />
      ))}

      <Pagination
        count={10}
        sx={{
          mx: 'auto',
          [`& .${paginationClasses.ul}`]: {
            my: 5,
            mx: 'auto',
            justifyContent: 'center',
          },
        }}
      />
    </>
  );
}
