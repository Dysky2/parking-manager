export interface Setting {
  id: string,
  operatingHoursStart: string,
  operatingHoursEnd: string,
  pricePerHour: number,
  vat: number,
  tripePublicKey: string,
  stripePrivateKey: string,
 requireDigitPassword: boolean,
  requireSpecialCharPassword: boolean,
  minLengthPassword: number,
  failedLoginAttempts: number
}
