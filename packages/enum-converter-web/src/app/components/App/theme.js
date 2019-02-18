import { createMuiTheme } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';

export const EnumConverterTheme = createMuiTheme({
  palette: {
    primary: indigo
  },
  typography: {
    useNextVariants: true
  }
});
