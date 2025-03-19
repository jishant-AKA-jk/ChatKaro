import {StyleSheet} from 'react-native';

export const appSpacing = {
  xsm: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
};

export const CStyles = StyleSheet.create({
  borderRadiusMd: {
    borderRadius: appSpacing.md,
  },
  borderRadiusXsm: {
    borderRadius: appSpacing.xsm,
  },
  container: {
    flex: 1,
  },
  gapRowSm: {
    rowGap: appSpacing.sm,
  },
  paddingSm: {
    padding: appSpacing.sm,
  },
  paddingBase: {
    padding: appSpacing.base,
  },
  paddingMd: {
    padding: appSpacing.md,
  },
  paddingBottomBase: {
    paddingBottom: appSpacing.base,
  },
  paddingBottomSm: {
    paddingBottom: appSpacing.sm,
  },
  paddingHorizontalBase: {
    paddingHorizontal: appSpacing.base,
  },
  paddingHorizontalSm: {
    paddingHorizontal: appSpacing.sm,
  },
  paddingHorizontalXsm: {
    paddingHorizontal: appSpacing.xsm,
  },
  paddingVerticalBase: {
    paddingVertical: appSpacing.base,
  },
  marginHorizontalBase: {
    marginHorizontal: appSpacing.base,
  },
  marginHorizontalMd: {
    marginHorizontal: appSpacing.md,
  },
  marginHorizontalSm: {
    marginHorizontal: appSpacing.sm,
  },
  marginVerticalLg: {
    marginVertical: appSpacing.lg,
  },
  marginVerticalBase: {
    marginVertical: appSpacing.base,
  },
  marginVerticalMd: {
    marginVertical: appSpacing.md,
  },
  marginVerticalSm: {
    marginVertical: appSpacing.sm,
  },
  marginTopBase: {
    marginTop: appSpacing.base,
  },
  marginTopMd: {
    marginTop: appSpacing.md,
  },
  marginTopSm: {
    marginTop: appSpacing.sm,
  },
  marginTopXsm: {
    marginTop: appSpacing.xsm,
  },
  marginBottomMd: {
    marginBottom: appSpacing.md,
  },
  marginBottomSm: {
    marginBottom: appSpacing.sm,
  },
  marginBottomLg: {
    marginBottom: appSpacing.lg,
  },
  marginBottomXl: {
    marginBottom: appSpacing.xl,
  },
  paddingHorizontalMd: {
    paddingHorizontal: appSpacing.md,
  },
  paddingVerticalMd: {
    paddingVertical: appSpacing.md,
  },
  paddingVerticalSm: {
    paddingVertical: appSpacing.sm,
  },
  paddingVerticalXSm: {
    paddingVertical: appSpacing.xsm,
  },
  paddingRightBase: {
    paddingRight: appSpacing.base,
  },
  paddingRightMd: {
    paddingRight: appSpacing.md,
  },
  paddingRightLg: {
    paddingRight: appSpacing.lg,
  },
  paddingRightSm: {
    paddingRight: appSpacing.sm,
  },
  paddingLeftBase: {
    paddingLeft: appSpacing.base,
  },
  paddingLeftMd: {
    paddingLeft: appSpacing.md,
  },
  paddingLeftLg: {
    paddingLeft: appSpacing.lg,
  },
  paddingLeftSm: {
    paddingLeft: appSpacing.sm,
  },
  marginRightBase: {
    marginRight: appSpacing.base,
  },
  marginRightMd: {
    marginRight: appSpacing.md,
  },
  marginRightLg: {
    marginRight: appSpacing.lg,
  },
  marginRightSm: {
    marginRight: appSpacing.sm,
  },
  marginLeftBase: {
    marginLeft: appSpacing.base,
  },
  marginLeftMd: {
    marginLeft: appSpacing.md,
  },
  marginLeftLg: {
    marginLeft: appSpacing.lg,
  },
  marginLeftSm: {
    marginLeft: appSpacing.sm,
  },
  alignSelfCenter: {
    alignSelf: 'center',
  },
  alignItemsCenter: {
    alignItems: 'center',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  justifyAround: {
    justifyContent: 'space-around',
  },
  justifyStart: {
    justifyContent: 'flex-start',
  },
  justifyBetween: {
    justifyContent: 'space-between',
  },
  justifyEven: {
    justifyContent: 'space-evenly',
  },
  flexCol: {
    flexDirection: 'column',
  },
  flexRow: {
    flexDirection: 'row',
  },
  dottedLine: {
    borderStyle: 'dashed',
  },
  textCapitalize: {
    textTransform: 'capitalize',
  },
  cetered: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
