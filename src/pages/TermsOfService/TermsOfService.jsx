import React from 'react';

const sections = [
  {
    title: '1. Project Nature',
    content: (
      <>
        <p>
          CoreX Nutrition is an open-source demo project created by Open Code
          Chicago. It is designed for educational purposes, Hacktoberfest
          contributions, and open-source collaboration.
        </p>
        <ul>
          <li>This is not a commercial store.</li>
          <li>No actual purchases, payments, or shipments take place.</li>
          <li>All content and features are for demonstration purposes only.</li>
        </ul>
      </>
    ),
  },
  {
    title: '2. User Responsibilities',
    content: (
      <>
        <p>By using this site, you agree to:</p>
        <ul>
          <li>
            Use the site for lawful, educational, and collaborative purposes
            only.
          </li>
          <li>
            Respect accessibility, inclusivity, and coding best practices when
            contributing.
          </li>
          <li>
            Avoid submitting harmful, malicious, or inappropriate content.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: '3. Contributions',
    content: (
      <>
        <p>Contributors to the CoreX Nutrition project agree to follow:</p>
        <ul>
          <li>Open Code Chicago’s contribution guidelines.</li>
          <li>
            Standard open-source licensing practices (MIT License unless
            otherwise stated).
          </li>
          <li>Proper attribution and respect for the work of others.</li>
        </ul>
      </>
    ),
  },
  {
    title: '4. Intellectual Property',
    content: (
      <>
        <p>
          All branding, design, and content for CoreX Nutrition are part of this
          demo project.
          <br />
          Code is shared under open-source licensing terms.
        </p>
        <p>
          Content may be reused for educational and open-source purposes, but
          not for misleading commercial activity.
        </p>
      </>
    ),
  },
  {
    title: '5. Disclaimers',
    content: (
      <ul>
        <li>
          CoreX Nutrition does not sell, process payments, or ship products.
        </li>
        <li>
          All supplements, reviews, and product descriptions are fictional or
          sample content.
        </li>
        <li>
          The Food and Drug Administration (FDA) has not evaluated any product
          statements made on this site.
        </li>
      </ul>
    ),
  },
  {
    title: '6. Limitation of Liability',
    content: (
      <p>
        To the maximum extent permitted by law, Open Code Chicago and its
        contributors shall not be held liable for any damages resulting from the
        use of this demo project, including but not limited to data loss,
        inaccuracies, or accessibility issues.
      </p>
    ),
  },
  {
    title: '7. Modifications to Terms',
    content: (
      <p>
        We reserve the right to update or modify these Terms of Service at any
        time to reflect changes in the project. Updates will be posted on this
        page with a revised "last updated" date.
      </p>
    ),
  },
  {
    title: '8. Contact & Community',
    content: (
      <p>
        For questions, contributions, or accessibility concerns, please contact
        us via our GitHub repository discussions.
      </p>
    ),
  },
];

const NAVBAR_HEIGHT = '8rem'; // adjust if your navbar is taller/shorter

const styles = {
  main: {
    maxWidth: '1000px', // Increased from 700px to 1000px
    margin: '0 auto',
    padding: `${NAVBAR_HEIGHT} 1rem 3rem 1rem`,
    background: 'var(--color-bg, #fff)',
    color: 'var(--color-text, #222)',
    fontFamily: 'inherit',
  },
  h1: {
    fontSize: '2.25rem',
    fontWeight: 700,
    marginBottom: '1.5rem',
    letterSpacing: '-0.02em',
    lineHeight: 1.2,
    
  },
  section: {
    marginBottom: '2rem',
  },
  sectionTitle: {
    fontSize: '1.15rem',
    fontWeight: 700,
    marginBottom: '0.5rem',
    marginTop: '1.5rem',
    letterSpacing: '0.01em',
  },
  p: {
    marginBottom: '0.5rem',
    lineHeight: 1.7,
  },
  ul: {
    paddingLeft: '1.25rem',
    marginBottom: 0,
    listStyleType: 'square',
  },
  li: {
    marginBottom: '0.25rem',
    listStyleType: 'square',
    lineHeight: 1.6,
  },
  lastUpdated: {
    fontWeight: 600,
    marginTop: '2.5rem',
    fontSize: '1rem',
    letterSpacing: '0.01em',
  },
  date: {
    fontSize: '1rem',
    color: 'var(--color-muted, #666)',
    marginTop: '0.25rem',
  },
};

// Recursively clone and style all ul/li/p elements
function styleContent(node) {
  if (!React.isValidElement(node)) return node;

  if (node.type === 'ul') {
    return React.cloneElement(
      node,
      { style: styles.ul },
      React.Children.map(node.props.children, styleContent)
    );
  }
  if (node.type === 'li') {
    return React.cloneElement(node, { style: styles.li });
  }
  if (node.type === 'p') {
    return React.cloneElement(node, { style: styles.p });
  }
  // For fragments or other elements, recurse into children
  if (node.props && node.props.children) {
    return React.cloneElement(
      node,
      node.props,
      React.Children.map(node.props.children, styleContent)
    );
  }
  return node;
}

const TermsOfService = () => {
  return (
    <main style={styles.main} aria-labelledby="tos-title" tabIndex={-1}>
      <h1 id="tos-title" style={styles.h1}>
        Terms of Service
      </h1>
      <p style={styles.p}>
        Welcome to CoreX Nutrition. These Terms of Service ("Terms") govern your
        use of our website and participation in this open-source project. By
        accessing or using this site, you agree to be bound by these Terms.
      </p>
      <hr></hr>
      {sections.map((section, idx) => (
        <section
          key={section.title}
          style={styles.section}
          aria-labelledby={`section-title-${idx}`}
        >
          <h2 id={`section-title-${idx}`} style={styles.sectionTitle}>
            {section.title}
          </h2>
          <article style={{ marginBottom: '1.25rem' }}>
            {React.Children.map(section.content, styleContent)}
          </article>
          <hr />
        </section>
      ))}
      <div style={styles.lastUpdated} aria-label="Last updated">
        LAST UPDATED
        <div style={styles.date}>October 2025</div>
      </div>
    </main>
  );
};

export default TermsOfService;
