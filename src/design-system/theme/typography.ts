import { scaledPixels } from '../helpers/scaledPixels';

export const fontFamilies = {
  // montserrat: {
  //   medium: 'Montserrat-Medium',
  //   semiBold: 'Montserrat-SemiBold',
  //   bold: 'Montserrat-Bold',
  // },
  inter: {
    regular: 'Inter-Regular',
    medium: 'Inter-Medium',
    semiBold: 'Inter-SemiBold',
    bold: 'Inter-Bold',
  }
};

export const typography = {
  title: {
    regular: {
      fontFamily: fontFamilies.inter.semiBold,
      fontSize: scaledPixels(32),
      lineHeight: scaledPixels(40),
    },
    strong: {
      fontFamily: fontFamilies.inter.bold,
      fontSize: scaledPixels(32),
      lineHeight: scaledPixels(40),
    },
  },
  body: {
    regular: {
      fontFamily: fontFamilies.inter.medium,
      fontSize: scaledPixels(24),
      lineHeight: scaledPixels(32),
    },
    strong: {
      fontFamily: fontFamilies.inter.semiBold,
      fontSize: scaledPixels(24),
      lineHeight: scaledPixels(32),
    },
  },
} as const;

export type TypographyVariant = keyof typeof typography;

export type FontWeight = 'regular' | 'strong';
