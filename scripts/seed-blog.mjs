/**
 * Seed script — migrates static blog posts into the CMS backend.
 *
 * Usage:
 *   ADMIN_EMAIL=you@example.com ADMIN_PASSWORD=yourpass node scripts/seed-blog.mjs
 *
 * Defaults: runs against http://localhost:9002 (Next.js dev server).
 * Override with BASE_URL env var.
 */

const BASE_URL = process.env.BASE_URL ?? 'http://localhost:9002';
const EMAIL = process.env.ADMIN_EMAIL;
const PASSWORD = process.env.ADMIN_PASSWORD;

if (!EMAIL || !PASSWORD) {
  console.error('Error: set ADMIN_EMAIL and ADMIN_PASSWORD env vars.');
  process.exit(1);
}

// ---------- blog posts (JSX → Markdown) ----------

const posts = [
  {
    title: 'The Future of Web Development with AI',
    slug: 'future-of-web-dev',
    description:
      'Explore how artificial intelligence is revolutionizing the way we build websites and applications.',
    imageUrl: '/blogData/blogData_01.png',
    tags: ['AI', 'Web Development', 'Future Tech'],
    status: 'published',
    publishedAt: '2025-01-26T00:00:00.000Z',
    content: `Artificial Intelligence (AI) is no longer a concept from science fiction; it's a powerful tool that is actively reshaping the landscape of web development. From automating repetitive tasks to creating highly personalized user experiences, AI is unlocking new potentials for developers and businesses alike.

## AI-Powered Code Generation

One of the most significant impacts of AI is in code generation. Tools like GitHub Copilot and other AI-powered assistants can suggest code snippets, complete functions, and even write entire blocks of code based on natural language descriptions. This not only speeds up the development process but also helps developers learn new languages and frameworks more efficiently.

## Personalized User Experiences

AI algorithms can analyze user behavior, preferences, and historical data to deliver dynamic and personalized content. E-commerce sites can recommend products with uncanny accuracy, streaming services can suggest movies you're likely to enjoy, and news websites can tailor their headlines to individual interests. This level of personalization leads to higher engagement and conversion rates.

## Automated Testing and Debugging

Quality assurance is a critical but time-consuming part of web development. AI can automate the testing process by intelligently generating test cases, identifying bugs, and even suggesting fixes. This allows developers to catch issues earlier in the development cycle and ensure a more robust final product.

## The Road Ahead

The integration of AI into web development is still in its early stages, but its trajectory is clear. As AI models become more sophisticated, we can expect to see even more innovative applications, from self-designing websites to intelligent chatbots that provide truly human-like support. Embracing these technologies will be key for any developer or business looking to stay at the forefront of the digital world.`,
  },
  {
    title: '10 SEO Tips to Boost Your Ranking',
    slug: 'seo-tips',
    description:
      "Learn simple yet effective SEO strategies to improve your website's visibility on search engines.",
    imageUrl: '/blogData/blogData_02.png',
    tags: ['SEO', 'Marketing', 'Website Traffic'],
    status: 'published',
    publishedAt: '2025-02-20T00:00:00.000Z',
    content: `Search Engine Optimization (SEO) is crucial for driving organic traffic to your website. While the world of SEO can seem complex, there are fundamental strategies that can make a significant difference. Here are 10 tips to help you boost your search engine ranking.

1. **Keyword Research:** Understand what terms your target audience is searching for and create content around those keywords.
2. **High-Quality Content:** Create valuable, informative, and engaging content that answers your users' questions.
3. **On-Page SEO:** Optimize title tags, meta descriptions, headers, and images with your target keywords.
4. **Mobile-Friendliness:** Ensure your website is responsive and provides a seamless experience on all devices.
5. **Page Speed:** A fast-loading website is a key ranking factor. Optimize images and leverage browser caching.
6. **Link Building:** Acquire high-quality backlinks from reputable websites to build your site's authority.
7. **User Experience (UX):** A clean, easy-to-navigate website encourages users to stay longer, which signals value to search engines.
8. **Use of Internal Linking:** Link to other relevant pages on your own website to help search engines understand your site structure.
9. **Schema Markup:** Implement structured data to help search engines better understand your content and display rich snippets.
10. **Monitor and Analyze:** Use tools like Google Analytics and Google Search Console to track your performance and identify areas for improvement.

By consistently applying these SEO best practices, you can improve your website's visibility and attract more organic traffic over time.`,
  },
  {
    title: 'Why Your Small Business Needs a Website',
    slug: 'small-business-website',
    description:
      'Discover the importance of having an online presence and how a website can help your business grow.',
    imageUrl: '/blogData/blogData_03.png',
    tags: ['Small Business', 'Online Presence', 'Growth'],
    status: 'published',
    publishedAt: '2025-04-15T00:00:00.000Z',
    content: `In today's digital age, a website is not just a luxury; it's a necessity for small businesses. If you're still on the fence about whether to invest in an online presence, here are some compelling reasons why your small business needs a website.

## 1. Increase Your Credibility

A professional, well-designed website instantly boosts your credibility. It provides a central place for customers to find information about your business, products, and services. Without a website, potential customers may question your legitimacy.

## 2. Reach a Wider Audience

Your physical storefront has geographical limitations, but a website is accessible to anyone, anywhere in the world. This opens up a vast new market and allows you to connect with customers you might never have reached otherwise.

## 3. 24/7 Availability

Your website works for you around the clock, even when you're not in the office. It can answer common customer questions, generate leads, and even process sales while you sleep. It's the ultimate marketing and sales tool that never takes a day off.

## 4. Showcase Your Products and Services

A website gives you a platform to beautifully showcase your offerings with high-quality images, detailed descriptions, and even video demonstrations. It allows you to tell your story and build a connection with your audience in a way that traditional advertising can't.

## 5. Compete with Larger Businesses

A well-optimized website allows you to compete on a level playing field with larger competitors. With the right strategy, you can attract targeted traffic and convert visitors into customers, regardless of the size of your business.

Investing in a website is an investment in the future of your business. It's an essential tool for growth, credibility, and customer engagement in the modern marketplace.`,
  },
  {
    title: 'The Benefits of Responsive Web Design',
    slug: 'responsive-web-design-benefit',
    description:
      "Learn why responsive web design is crucial for your website's success in today's multi-device world.",
    imageUrl: '/blogData/blogData_04.png',
    tags: ['Web Design', 'User Experience', 'Mobile'],
    status: 'published',
    publishedAt: '2025-04-20T00:00:00.000Z',
    content: `In an era where users access websites from a variety of devices, responsive web design has become essential. Here are some key benefits of adopting a responsive design approach.

## 1. Improved User Experience

Responsive web design ensures that your website looks and functions well on all devices, providing a seamless user experience. This leads to higher user satisfaction and increased engagement.

## 2. Increased Mobile Traffic

With more users browsing the web on mobile devices, having a responsive website is crucial for capturing this audience. Google also prioritizes mobile-friendly sites in its search results.

## 3. Cost-Effectiveness

Maintaining a single responsive website is more cost-effective than creating separate versions for desktop and mobile. It simplifies updates and reduces development time.

## 4. Better SEO Performance

Responsive design is favored by search engines, which can improve your website's visibility. A single URL for all devices makes it easier for search engines to index your content.

## 5. Future-Proofing

As new devices with varying screen sizes continue to emerge, responsive web design ensures that your website remains accessible and functional across all platforms.

In conclusion, investing in responsive web design is essential for providing a positive user experience and staying competitive in the digital landscape.`,
  },
  {
    title: 'Understanding Web Accessibility',
    slug: 'web-accessibility',
    description:
      'A guide to making your website accessible to all users, including those with disabilities.',
    imageUrl: '/blogData/blogData_05.png',
    tags: ['Accessibility', 'Web Design', 'Inclusivity'],
    status: 'published',
    publishedAt: '2025-05-25T00:00:00.000Z',
    content: `Web accessibility is about ensuring that everyone, including people with disabilities, can use your website. Here are some key principles and practices to consider.

## 1. Use Semantic HTML

Properly structured HTML helps screen readers interpret your content correctly. Use headings, lists, and other semantic elements to create a logical structure.

## 2. Provide Text Alternatives

All non-text content should have text alternatives (alt text) that describe the content for users who cannot see images or videos.

## 3. Ensure Keyboard Navigation

Make sure all interactive elements can be accessed using a keyboard, as some users may not be able to use a mouse.

## 4. Use Sufficient Color Contrast

Ensure that text and background colors have sufficient contrast to be readable by users with visual impairments.

## 5. Test with Real Users

Conduct usability testing with people who have disabilities to identify potential barriers and improve the overall accessibility of your site.

By following these principles, you can create a more inclusive web experience that benefits all users.`,
  },
  {
    title: 'The Importance of Responsive Web Design',
    slug: 'responsive-web-design-importance',
    description:
      'An exploration of why responsive web design is crucial for modern websites.',
    imageUrl: '/blogData/blogData_06.png',
    tags: ['Web Design', 'User Experience', 'Mobile'],
    status: 'published',
    publishedAt: '2025-08-30T00:00:00.000Z',
    content: `Responsive web design is an approach that ensures your website looks and functions well on all devices, from desktops to smartphones. Here are some key reasons why it's important.

## 1. Improved User Experience

Responsive web design ensures that your website looks and functions well on all devices, providing a seamless user experience. This leads to higher user satisfaction and increased engagement.

## 2. Increased Mobile Traffic

With more users browsing the web on mobile devices, having a responsive website is crucial for capturing this audience. Google also prioritizes mobile-friendly sites in its search results.

## 3. Cost-Effectiveness

Maintaining a single responsive website is more cost-effective than creating separate versions for desktop and mobile. It simplifies updates and reduces development time.

## 4. Better SEO Performance

Responsive design is favored by search engines, which can improve your website's visibility. A single URL for all devices makes it easier for search engines to index your content.

## 5. Future-Proofing

As new devices with varying screen sizes continue to emerge, responsive web design ensures that your website remains accessible and functional across all platforms.

In conclusion, investing in responsive web design is essential for providing a positive user experience and staying competitive in the digital landscape.`,
  },
];

// ---------- helpers ----------

async function login() {
  const res = await fetch(`${BASE_URL}/api/admin/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: EMAIL, password: PASSWORD }),
    redirect: 'manual',
  });

  if (res.status !== 200 && res.status !== 302) {
    const text = await res.text().catch(() => '');
    throw new Error(`Login failed (${res.status}): ${text}`);
  }

  const setCookie = res.headers.get('set-cookie') ?? '';
  const match = setCookie.match(/chs_admin_session=[^;]+/);
  if (!match) throw new Error('Login succeeded but no session cookie found in response.');
  console.log('✓ Logged in');
  return match[0];
}

async function createPost(cookie, post) {
  const res = await fetch(`${BASE_URL}/api/blog`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: cookie },
    body: JSON.stringify(post),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error ?? `HTTP ${res.status}`);
  }
  return data;
}

// ---------- main ----------

async function main() {
  console.log(`Seeding ${posts.length} blog posts to ${BASE_URL}...\n`);

  const cookie = await login();

  let ok = 0;
  let fail = 0;

  for (const post of posts) {
    try {
      const created = await createPost(cookie, post);
      console.log(`✓ "${post.title}" → id: ${created.id}`);
      ok++;
    } catch (err) {
      console.error(`✗ "${post.title}": ${err.message}`);
      fail++;
    }
  }

  console.log(`\nDone. ${ok} created, ${fail} failed.`);
}

main().catch((err) => {
  console.error('Fatal:', err.message);
  process.exit(1);
});
