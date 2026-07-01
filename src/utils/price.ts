export function getDiscountedPrice(price: number, discountPercentage: number): number {
  return Math.round(price * (1 - discountPercentage / 100) * 100) / 100
}

export function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`
}
