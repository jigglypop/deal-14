export const formatPrice = (price: number | null) => {
  if (price === null) {
    return '미정';
  }

  const formatter = Intl.NumberFormat();
  return `${formatter.format(price)}원`;
}