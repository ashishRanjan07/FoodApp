import { AppColor } from '../../utils/AppColor';
import {ImagePath} from '../../utils/ImagePath';

const TopCategory = [
  {
    id: 1,
    name: 'Home Cooked Food ',
    type: 'Regular Meal Service',
    image: ImagePath.f1,
    color:AppColor.yellow
  },
  {
    id: 2,
    name: 'Authentic Specialties',
    type: 'Advance Ordering',
    image: ImagePath.f2,
    color:AppColor.green
  },
  {
    id: 3,
    name: 'Weekend Party Order',
    type: 'Pre Order',
    image: ImagePath.f3,
    color:AppColor.green
  },
  {
    id: 4,
    name: 'Authentic from your home Country',
    type: 'Instant Order',
    image: ImagePath.f4,
    color:AppColor.yellow
  },
];

export default TopCategory;
