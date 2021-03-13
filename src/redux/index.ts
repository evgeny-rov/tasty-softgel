import {combineReducers, createStore} from 'redux';
import {AppState} from 'src/types';
import medicinesReducer from './entities/medicines/reducer';
import pickerReducer from './entities/picker/reducer';
import remindersReducer from './entities/reminders/reducer';

const rootReducer = combineReducers<AppState>({
  medicines: medicinesReducer,
  reminders: remindersReducer,
  picker: pickerReducer,
});

const store = createStore(rootReducer);

export default store;
