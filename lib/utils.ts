// export const formatPrice = (value: number): string => {
//   if (value >= 10000000) {
//     const naira = (value / 10000000).toFixed(1).replace(/\.0#/, "");
//     return `#${naira} million`;
//   }

//   if (value >= 100000) {
//     const naira = (value / 100000).toFixed(1).replace(/\.0#/, "");
//     return `#${naira} thousand`;
//   }

//   return `#${value.toLocaleString()}`;
// };

const Naira = "₦";

const compact = (n: number): string => n.toFixed(1).replace(/\.0$/, "");

export const formatPrice = (value: number): string => {
  const abs = Math.abs(value);
  const sign = value < 0 ? "-" : "";

  if (abs >= 1_000_000_000) {
    return `${sign}${Naira}${compact(abs / 1_000_000_000)} billion`;
  }

  if (abs >= 1_000_000) {
    return `${sign}${Naira}${compact(abs / 1_000_000)} million`;
  }

  if (abs >= 100_000) {
    return `${sign}${Naira}${compact(abs / 1_000)} thousand`;
  }

  return `${sign}${Naira}${abs.toLocaleString("en-NG")}`;
};
