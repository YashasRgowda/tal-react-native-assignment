/**
 * Maps a company logo key to its local asset.
 * Using local assets avoids network failures in simulators and ensures
 * consistent rendering without any CDN dependency.
 */
const LOGO_MAP: Record<string, number> = {
  amazon: require('../../assets/amazon.png'),
  google: require('../../assets/google.png'),
  microsoft: require('../../assets/microsoft.png'),
  phonepe: require('../../assets/phonepe.png'),
  swiggy: require('../../assets/swiggy.png'),
  zomato: require('../../assets/zomato.png'),
};

const FALLBACK = require('../../assets/icon.png');

export function getCompanyLogo(key: string): number {
  return LOGO_MAP[key.toLowerCase()] ?? FALLBACK;
}
