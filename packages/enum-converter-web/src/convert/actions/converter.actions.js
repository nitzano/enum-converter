import { createActions } from 'redux-actions';

import { store } from '../../store/components/Store/Store';

import axios from 'axios';

async function apiConvertEnum() {
  const { source, configuration } = store.getState();

  const response = await axios.post('/api/convert', {
    enum: source,
    configuration
  });

  return response.data.result;
}

export const {
  changeSource,
  changeConfiguration,
  resetConfiguration,
  convertEnum
} = createActions({
  CHANGE_SOURCE: enumString => ({ enumString }),
  CHANGE_CONFIGURATION: configuration => ({ configuration }),
  RESET_CONFIGURATION: configuration => ({ configuration }),
  CONVERT_ENUM: apiConvertEnum
});
