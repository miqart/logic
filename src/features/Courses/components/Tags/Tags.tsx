import { Dispatch, SetStateAction, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import clsx from 'clsx';
import { TTags, TTagState } from './Tags.types';
import styles from './Tags.styles.scss';

interface IProps {
  tags: TTags;
  filterBy: TTagState;
  setFilterBy: Dispatch<SetStateAction<TTagState>>;
  isLoadingTags: boolean;
  isLoadingCourses: boolean;
  setIsLoadingCourses: Dispatch<SetStateAction<boolean>>;
}

const Tags = ({
  tags,
  filterBy,
  setFilterBy,
  isLoadingTags,
  isLoadingCourses,
  setIsLoadingCourses,
}: IProps) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const onChangeTag = async (tag: TTagState, index: number) => {
    if (tag === filterBy) return;

    setIsLoadingCourses(true);
    setActiveIndex(index);
    setFilterBy(tag);
    // Note: Delay to show loading
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsLoadingCourses(false);
  };

  return (
    <div className="tags">
      {!isLoadingTags ? (
        <>
          <div
            className="activeBtnOverlay"
            style={{
              top:
                parseInt(styles.buttonHeight) * activeIndex +
                parseInt(styles.containerPadding),
            }}
          />
          {tags.map((tag, index) => (
            <button
              disabled={isLoadingCourses}
              key={tag}
              className={clsx('tagBtn', { active: filterBy === tag })}
              onClick={() => onChangeTag(tag, index)}
            >
              {tag}
            </button>
          ))}
        </>
      ) : (
        <Skeleton height={42} count={7} borderRadius={12} />
      )}
    </div>
  );
};
export default Tags;
