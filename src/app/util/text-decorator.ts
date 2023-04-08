/**
 * Replaces <buff> and <debuff> tags with appropriate HTML.
 * @param text The text to modify.
 * @returns HTML that appropriately decorates the text.
 */
export function decorate(text: string): string {
  return text
    .replace('<buff>', '<span class="stat-buffed">')
    .replace('</buff>', '</span>')
    .replace('<debuff>', '<span class="stat-debuffed">')
    .replace('</debuff>', '</span>');
}