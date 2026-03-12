import { cn } from '@/lib/utils';

describe('cn (classname utility)', () => {
  it('returns a single class as-is', () => {
    expect(cn('foo')).toBe('foo');
  });

  it('merges multiple class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
  });

  it('handles conditional classes (falsy values ignored)', () => {
    expect(cn('foo', false && 'bar', null, undefined, '')).toBe('foo');
  });

  it('deduplicates conflicting Tailwind classes (last wins)', () => {
    expect(cn('p-2', 'p-4')).toBe('p-4');
    expect(cn('text-sm', 'text-lg')).toBe('text-lg');
  });

  it('merges object syntax from clsx', () => {
    expect(cn({ foo: true, bar: false })).toBe('foo');
    expect(cn({ foo: true, bar: true })).toBe('foo bar');
  });

  it('returns empty string when no valid classes are given', () => {
    expect(cn(false as unknown as string, null, undefined)).toBe('');
  });

  it('combines array syntax', () => {
    expect(cn(['foo', 'bar'])).toBe('foo bar');
  });
});
