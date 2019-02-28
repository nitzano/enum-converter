import { handleActions } from 'redux-actions';
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
  CHANGE_SOURCE: (state, action) => ({
    ...state,
    source: action.payload.enumString
  }),
  CHANGE_CONFIGURATION: (state, action) => ({
    ...state,
    configuration: { ...state.configuration, ...action.payload.configuration }
  }),
  RESET_CONFIGURATION: (state, action) => ({
    ...state,
    configuration: { ...state.configuration, ...DEFAULT_STYLING_OPTIONS }
  }),
  CONVERT_ENUM: (state, action) => ({
    ...state,
    destination: action.error ? 'Invalid Enum' : action.payload,
    isError: action.error ? true : false
  })
};

const reducer = handleActions(handlers, DEFAULT_STATE);

export default reducer;
