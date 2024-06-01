import Skeleton from 'react-loading-skeleton';
import { v4 as uuidv4 } from 'uuid';

type NonZeroNumber = Exclude<number, 0>;

interface IProps {
  count: NonZeroNumber;
}

const CourseCardSkeleton = ({ count }: IProps) => {
  const skeletons = Array.from({ length: count }, () => uuidv4());

  return (
    <>
      {skeletons.map((el) => (
        <Skeleton key={el} height={210} count={1} borderRadius={18} />
      ))}
    </>
  );
};
export default CourseCardSkeleton;
