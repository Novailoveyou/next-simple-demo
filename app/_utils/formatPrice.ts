export const formatPrice = (price: number) =>
  (price || price === 0) && `$${price}`
