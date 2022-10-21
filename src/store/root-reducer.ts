import {combineReducers} from 'redux';
import { appData } from './app-data/app-data';
import { userData } from './user-data/user-data';

enum NameSpace {
  data = 'DATA',
  user = 'USER',
}

const rootReducer = combineReducers({
  [NameSpace.data]: appData,
  [NameSpace.user]: userData,
});

export { rootReducer };

export type State = ReturnType<typeof rootReducer>;
