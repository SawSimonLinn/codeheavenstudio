import { heroContent, heroMockups, heroStats } from '@/lib/hero-data';

describe('heroContent', () => {
  it('has a badge string', () => {
    expect(typeof heroContent.badge).toBe('string');
    expect(heroContent.badge.length).toBeGreaterThan(0);
  });

  it('has a description string', () => {
    expect(typeof heroContent.description).toBe('string');
    expect(heroContent.description.length).toBeGreaterThan(0);
  });

  it('primaryCta has label and href', () => {
    expect(typeof heroContent.primaryCta.label).toBe('string');
    expect(typeof heroContent.primaryCta.href).toBe('string');
    expect(heroContent.primaryCta.href).toMatch(/^[/#]/);
  });

  it('secondaryCta has label and href', () => {
    expect(typeof heroContent.secondaryCta.label).toBe('string');
    expect(typeof heroContent.secondaryCta.href).toBe('string');
    expect(heroContent.secondaryCta.href).toMatch(/^[/#]/);
  });

  it('floatingBadge is a non-empty string', () => {
    expect(typeof heroContent.floatingBadge).toBe('string');
    expect(heroContent.floatingBadge.length).toBeGreaterThan(0);
  });

  it('testimonial has quote and author', () => {
    expect(typeof heroContent.testimonial.quote).toBe('string');
    expect(typeof heroContent.testimonial.author).toBe('string');
    expect(heroContent.testimonial.quote.length).toBeGreaterThan(0);
    expect(heroContent.testimonial.author.length).toBeGreaterThan(0);
  });
});

describe('heroMockups', () => {
  it('is a non-empty array', () => {
    expect(Array.isArray(heroMockups)).toBe(true);
    expect(heroMockups.length).toBeGreaterThan(0);
  });

  it('each mockup has url, image, and label', () => {
    heroMockups.forEach((mockup) => {
      expect(typeof mockup.url).toBe('string');
      expect(typeof mockup.image).toBe('string');
      expect(typeof mockup.label).toBe('string');
      expect(mockup.url.length).toBeGreaterThan(0);
      expect(mockup.image.length).toBeGreaterThan(0);
      expect(mockup.label.length).toBeGreaterThan(0);
    });
  });

  it('image paths start with /', () => {
    heroMockups.forEach((mockup) => {
      expect(mockup.image).toMatch(/^\//);
    });
  });
});

describe('heroStats', () => {
  it('is a non-empty array', () => {
    expect(Array.isArray(heroStats)).toBe(true);
    expect(heroStats.length).toBeGreaterThan(0);
  });

  it('each stat has value and label', () => {
    heroStats.forEach((stat) => {
      expect(typeof stat.value).toBe('string');
      expect(typeof stat.label).toBe('string');
      expect(stat.value.length).toBeGreaterThan(0);
      expect(stat.label.length).toBeGreaterThan(0);
    });
  });
});
