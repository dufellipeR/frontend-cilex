export default function unformatTel(tel: string): string {
  const formated = tel
    .replace('(', '')
    .replace(')', '')
    .replace(' ', '')
    .replace('-', '');

  return formated;
}
