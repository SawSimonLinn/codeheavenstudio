import React from 'react';
import { render, screen } from '@testing-library/react';
import HeroSection from '@/components/sections/hero';
import { heroContent, heroStats, heroMockups } from '@/lib/hero-data';

jest.mock('lucide-react', () => ({
  ArrowRight: () => <svg data-testid="icon-arrow-right" />,
  Star: () => <svg data-testid="icon-star" />,
}));

jest.mock('next/image', () => {
  const MockImage = ({ src, alt }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} />
  );
  MockImage.displayName = 'MockImage';
  return MockImage;
});

describe('HeroSection', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    render(<HeroSection />);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders the hero badge', () => {
    expect(screen.getByText(heroContent.badge)).toBeInTheDocument();
  });

  it('renders the hero description', () => {
    expect(screen.getByText(heroContent.description)).toBeInTheDocument();
  });

  it('renders the primary CTA button', () => {
    expect(
      screen.getByRole('link', { name: new RegExp(heroContent.primaryCta.label, 'i') }),
    ).toBeInTheDocument();
  });

  it('primary CTA links to the correct href', () => {
    const link = screen.getByRole('link', { name: new RegExp(heroContent.primaryCta.label, 'i') });
    expect(link).toHaveAttribute('href', heroContent.primaryCta.href);
  });

  it('renders the secondary CTA button', () => {
    expect(
      screen.getByRole('link', { name: new RegExp(heroContent.secondaryCta.label, 'i') }),
    ).toBeInTheDocument();
  });

  it('secondary CTA links to the correct href', () => {
    const link = screen.getByRole('link', { name: new RegExp(heroContent.secondaryCta.label, 'i') });
    expect(link).toHaveAttribute('href', heroContent.secondaryCta.href);
  });

  it('renders all hero stats values', () => {
    heroStats.forEach((stat) => {
      expect(screen.getByText(stat.value)).toBeInTheDocument();
    });
  });

  it('renders all hero stats labels', () => {
    heroStats.forEach((stat) => {
      expect(screen.getByText(stat.label)).toBeInTheDocument();
    });
  });

  it('renders the testimonial quote', () => {
    expect(screen.getByText(new RegExp(heroContent.testimonial.quote, 'i'))).toBeInTheDocument();
  });

  it('renders the testimonial author', () => {
    expect(screen.getByText(heroContent.testimonial.author)).toBeInTheDocument();
  });

  it('renders the floating badge', () => {
    expect(screen.getByText(heroContent.floatingBadge)).toBeInTheDocument();
  });

  it('renders the first mockup URL on initial render', () => {
    expect(screen.getByText(heroMockups[0].url)).toBeInTheDocument();
  });

  it('shows the first rotating heading on initial render', () => {
    expect(screen.getByText('Where Ideas Become Software')).toBeInTheDocument();
  });
});
