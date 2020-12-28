import {colors, size} from '../../../global/styles';
export const styles = {
  pageWrapper: {
    flexGrow: 1,
    alignSelf: 'stretch',
    backgroundColor: colors.background.primary,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  searchBarButtonContainer: {
    flex: 1 / 4,
    justifyContent: 'flex-end',
    alignSelf: 'stretch',
    paddingHorizontal: size.padding.xlg,
  },
};
