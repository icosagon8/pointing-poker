export function getInitials(name: string, lastname: string): string | null {
  if (name && lastname) return `${name[0]}${lastname[0]}`;
  if (name) return `${name[0]}${name[name.length - 1]}`;
  if (lastname) return `${lastname[0]}${lastname[lastname.length - 1]}`;
  return null;
}
