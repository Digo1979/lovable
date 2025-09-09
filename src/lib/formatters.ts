
// Formatting functions for CNPJ, phone numbers, and CEP

export function maskCNPJ(value: string): string {
  const cleanValue = value.replace(/\D/g, '');
  
  if (cleanValue.length <= 2) return cleanValue;
  if (cleanValue.length <= 5) return `${cleanValue.slice(0, 2)}.${cleanValue.slice(2)}`;
  if (cleanValue.length <= 8) return `${cleanValue.slice(0, 2)}.${cleanValue.slice(2, 5)}.${cleanValue.slice(5)}`;
  if (cleanValue.length <= 12) return `${cleanValue.slice(0, 2)}.${cleanValue.slice(2, 5)}.${cleanValue.slice(5, 8)}/${cleanValue.slice(8)}`;
  
  return `${cleanValue.slice(0, 2)}.${cleanValue.slice(2, 5)}.${cleanValue.slice(5, 8)}/${cleanValue.slice(8, 12)}-${cleanValue.slice(12, 14)}`;
}

export function unmaskCNPJ(value: string): string {
  return value.replace(/\D/g, '');
}

export function formatCNPJ(value: string): string {
  return maskCNPJ(value);
}

export function maskPhone(value: string): string {
  const cleanValue = value.replace(/\D/g, '');
  
  if (cleanValue.length <= 2) return cleanValue;
  if (cleanValue.length <= 6) return `(${cleanValue.slice(0, 2)}) ${cleanValue.slice(2)}`;
  if (cleanValue.length <= 10) return `(${cleanValue.slice(0, 2)}) ${cleanValue.slice(2, 6)}-${cleanValue.slice(6)}`;
  
  return `(${cleanValue.slice(0, 2)}) ${cleanValue.slice(2, 7)}-${cleanValue.slice(7, 11)}`;
}

export function formatPhone(value: string): string {
  return maskPhone(value);
}

export function maskCEP(value: string): string {
  const cleanValue = value.replace(/\D/g, '');
  
  if (cleanValue.length <= 5) return cleanValue;
  
  return `${cleanValue.slice(0, 5)}-${cleanValue.slice(5, 8)}`;
}

export function formatCEP(value: string): string {
  return maskCEP(value);
}

export function validateCNPJ(cnpj: string): boolean {
  const cleanCNPJ = cnpj.replace(/\D/g, '');
  
  if (cleanCNPJ.length !== 14) return false;
  
  // Check if all digits are the same
  if (/^(\d)\1+$/.test(cleanCNPJ)) return false;
  
  // Calculate verification digits
  let sum = 0;
  let weight = 5;
  
  for (let i = 0; i < 12; i++) {
    sum += parseInt(cleanCNPJ.charAt(i)) * weight;
    weight = weight === 2 ? 9 : weight - 1;
  }
  
  let digit = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (parseInt(cleanCNPJ.charAt(12)) !== digit) return false;
  
  sum = 0;
  weight = 6;
  
  for (let i = 0; i < 13; i++) {
    sum += parseInt(cleanCNPJ.charAt(i)) * weight;
    weight = weight === 2 ? 9 : weight - 1;
  }
  
  digit = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  return parseInt(cleanCNPJ.charAt(13)) === digit;
}