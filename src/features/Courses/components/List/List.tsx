import { useMemo } from 'react';
import { allTagsOption, TTagState } from '../Tags';
import CourseCard, { CourseCardSkeleton, ICourse } from '../CourseCard';
import './List.styles.scss';

interface IProps {
  filterBy: TTagState;
  courses: ICourse[];
  isLoading: boolean;
}

const List = ({ courses, filterBy, isLoading }: IProps) => {
  const filteredCourses = useMemo(
    () =>
      filterBy === allTagsOption
        ? courses
        : courses.filter((el) => el.tags.includes(filterBy)),
    [courses, filterBy],
  );

  return (
    <div className="list">
      {!isLoading ? (
        filteredCourses?.map((item) => (
          <CourseCard key={item.id} data={item} isLoading={isLoading} />
        ))
      ) : (
        <CourseCardSkeleton count={6} />
      )}
    </div>
  );
};
export default List;
