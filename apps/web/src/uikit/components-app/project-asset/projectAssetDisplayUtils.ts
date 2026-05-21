export function hasContent(value?: string | null): boolean {
  return Boolean(value?.trim());
}
