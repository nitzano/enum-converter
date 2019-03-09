import { createActions } from 'redux-actions';
import { apolloClient } from '../../app/providers/graphql/apollo-client';
import { store } from '../../store/components/Store/Store';
import { CONVERT_ENUM } from './convert-enum';

async function apiConvertEnum() {
  const { source, configuration } = store.getState();

  const {
    data: { convert }
  } = await apolloClient.query({
    query: CONVERT_ENUM,
    variables: { source, configuration }
  });

  return convert;
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
