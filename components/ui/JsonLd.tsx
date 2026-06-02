/**
 * Renders one or more schema.org objects as a single
 * <script type="application/ld+json"> tag.
 *
 * Accepts either a single schema object or an array. Mirrors the inline
 * pattern already used in app/layout.tsx and the page templates, but as a
 * reusable component for new schema injection points.
 */

interface JsonLdProps {
  data: unknown | unknown[];
}

export function JsonLd({ data }: JsonLdProps) {
  const arr = Array.isArray(data) ? data : [data];
  const payload = arr.length === 1 ? arr[0] : arr;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
