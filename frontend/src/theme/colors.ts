// Warm Amber & Stone palette from design_guidelines.json. No blue/purple.
export interface Colors {
  surface: string;
  onSurface: string;
  surfaceSecondary: string;
  onSurfaceSecondary: string;
  surfaceTertiary: string;
  onSurfaceTertiary: string;
  surfaceInverse: string;
  onSurfaceInverse: string;
  brand: string;
  brandPrimary: string;
  onBrandPrimary: string;
  brandSecondary: string;
  onBrandSecondary: string;
  brandTertiary: string;
  onBrandTertiary: string;
  success: string;
  onSuccess: string;
  warning: string;
  onWarning: string;
  error: string;
  onError: string;
  info: string;
  onInfo: string;
  border: string;
  borderStrong: string;
  divider: string;
}

export const lightColors: Colors = {
  surface: "#FAF9F6",
  onSurface: "#292524",
  surfaceSecondary: "#F3F2EE",
  onSurfaceSecondary: "#44403C",
  surfaceTertiary: "#E7E5DF",
  onSurfaceTertiary: "#292524",
  surfaceInverse: "#1C1917",
  onSurfaceInverse: "#FAF9F6",
  brand: "#D97706",
  brandPrimary: "#D97706",
  onBrandPrimary: "#FFFFFF",
  brandSecondary: "#B45309",
  onBrandSecondary: "#FFFFFF",
  brandTertiary: "#FEF3C7",
  onBrandTertiary: "#92400E",
  success: "#166534",
  onSuccess: "#FFFFFF",
  warning: "#CA8A04",
  onWarning: "#FFFFFF",
  error: "#991B1B",
  onError: "#FFFFFF",
  info: "#44403C",
  onInfo: "#FFFFFF",
  border: "#E7E5DF",
  borderStrong: "#D6D3D1",
  divider: "#E7E5DF",
};

export const darkColors: Colors = {
  surface: "#1C1917",
  onSurface: "#F5F5F4",
  surfaceSecondary: "#292524",
  onSurfaceSecondary: "#D6D3D1",
  surfaceTertiary: "#44403C",
  onSurfaceTertiary: "#F5F5F4",
  surfaceInverse: "#FAF9F6",
  onSurfaceInverse: "#1C1917",
  brand: "#F59E0B",
  brandPrimary: "#F59E0B",
  onBrandPrimary: "#1C1917",
  brandSecondary: "#FCD34D",
  onBrandSecondary: "#1C1917",
  brandTertiary: "#78350F",
  onBrandTertiary: "#FDE68A",
  success: "#4ADE80",
  onSuccess: "#1C1917",
  warning: "#FBBF24",
  onWarning: "#1C1917",
  error: "#F87171",
  onError: "#1C1917",
  info: "#D6D3D1",
  onInfo: "#1C1917",
  border: "#44403C",
  borderStrong: "#57534E",
  divider: "#292524",
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  "2xl": 32,
  "3xl": 48,
};

export const radius = {
  sm: 6,
  md: 12,
  lg: 20,
  pill: 999,
};

export const fonts = {
  displayRegular: "PlayfairDisplay-Regular",
  displaySemiBold: "PlayfairDisplay-SemiBold",
  displayBold: "PlayfairDisplay-Bold",
  textRegular: "DMSans-Regular",
  textMedium: "DMSans-Medium",
  textBold: "DMSans-Bold",
};
