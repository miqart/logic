import Skeleton from 'react-loading-skeleton';
import { ICourse } from './CourseCard.types';
import './CourseCard.styles.scss';

interface IProps {
  data: ICourse;
  isLoading: boolean;
}

const CourseCard = ({ data: { name, bgColor, image }, isLoading }: IProps) => {
  return isLoading ? (
    <Skeleton height={210} borderRadius={18} />
  ) : (
    <div className="card">
      <div className="pictureWrapper" style={{ backgroundColor: bgColor }}>
        <img className="picture" src={image} alt={name} />
      </div>
      <div className="titleWrapper">
        <h3 className="title">{name}</h3>
      </div>
    </div>
  );
};
export default CourseCard;
