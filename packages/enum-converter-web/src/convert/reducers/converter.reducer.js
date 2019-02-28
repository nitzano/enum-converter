import { handleActions } from 'redux-actions';
import {
  changeConfiguration,
  changeSource,
  convertEnum,
  resetConfiguration
} from '../actions/converter.actions';
import { PYTHON_SAMPLE_ENUM } from './../../convert/components/ConvertScreen/pythonSample';

const DEFAULT_STYLING_OPTIONS = {
  emitFileName: false,
  emitStats: true,
  sortEnums: '',
  sortValues: '',
  nameStyle: '',
  keyStyle: '',
  valueStyle: ''
};

const DEFAULT_STATE = {
  source: PYTHON_SAMPLE_ENUM,
  destination: '',
  configuration: {
    ...DEFAULT_STYLING_OPTIONS,
    from: 'python',
    to: 'typescript'
  },
  isError: false
};

const handlers = {
  [changeSource]: (state, action) => ({
    ...state,
    source: action.payload.enumString
  }),
  [changeConfiguration]: (state, action) => ({
    ...state,
    configuration: { ...state.configuration, ...action.payload.configuration }
  }),
  [resetConfiguration]: (state, action) => ({
    ...state,
    configuration: { ...state.configuration, ...DEFAULT_STYLING_OPTIONS }
  }),
  [convertEnum]: (state, action) => ({
    ...state,
    destination: action.error ? 'Invalid Enum' : action.payload,
    isError: action.error ? true : false
  })
};

console.log('handlers', handlers);

const reducer = handleActions(handlers, DEFAULT_STATE);

export default reducer;
