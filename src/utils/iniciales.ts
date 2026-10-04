/**
 * Iniciales de nombre y apellido.
 *  - Con nombres y apellidos por separado: primera letra de cada uno ("Ana María", "Pérez Soto" → "AP").
 *  - Con el nombre completo en un solo texto: primer nombre + primer apellido
 *    ("Carlos Enrique Moll Gallardo" → "CM", "Juan Pérez" → "JP").
 */
export function iniciales(nombres: string, apellidos?: string): string {
  const letra = (s: string | undefined) => (s?.trim()[0] ?? '').toUpperCase();
  if (apellidos !== undefined) return `${letra(nombres)}${letra(apellidos)}`;
  const p = nombres.trim().split(/\s+/).filter(Boolean);
  if (p.length <= 1) return letra(p[0]);
  // 4 o más palabras: dos nombres + dos apellidos → el apellido es la tercera.
  const apellido = p.length >= 4 ? p[2] : p[1];
  return `${letra(p[0])}${letra(apellido)}`;
}
