import { useEffect, useState } from 'react';
import Filters, { TTags, TTagState } from './components/Tags';
import List from './components/List';
import { ICourse } from './components/CourseCard';
import './Courses.styles.scss';
import { allTagsOption } from './components/Tags';

const Courses = () => {
  const [isLoadingTags, setIsLoadingTags] = useState<boolean>(true);
  const [isLoadingCourses, setIsLoadingCourses] = useState<boolean>(true);
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [tags, setTags] = useState<TTags>([]);
  const [filterBy, setFilterBy] = useState<TTagState>(allTagsOption);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('https://logiclike.com/docs/courses.json');
        const data: ICourse[] = await res.json();
        const uniqueTags = [
          allTagsOption,
          ...new Set(data.flatMap((course) => course.tags)),
        ];

        // Note: Delay to show loading
        await new Promise((resolve) => setTimeout(resolve, 2500));

        setTags(uniqueTags);
        setCourses(data);
      } catch (error) {
        if (error instanceof Error) {
          // Note: In real project we should show some toast
          console.error(error.message);
        } else {
          // Note: In real project we should show some toast
          console.error('An unknown error occurred:', error);
        }
      } finally {
        setIsLoadingTags(false);
        setIsLoadingCourses(false);
      }
    })();
  }, []);

  return (
    <div className="courses">
      <Filters
        tags={tags}
        filterBy={filterBy}
        setFilterBy={setFilterBy}
        setIsLoadingCourses={setIsLoadingCourses}
        isLoadingTags={isLoadingTags}
        isLoadingCourses={isLoadingCourses}
      />
      <List
        courses={courses}
        filterBy={filterBy}
        isLoading={isLoadingCourses}
      />
    </div>
  );
};
export default Courses;
