import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import BookInfo from './BookInfo/BookContainer';
import BookDetail from './BookInfo/Components/BookDetailPage';

const navigator = createStackNavigator(
  {
    Home: BookInfo,
    BookInfoPage: BookDetail
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      title: 'Good Reads'
    }
  }
);

export default createAppContainer(navigator);

