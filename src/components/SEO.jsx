import { useEffect } from 'react';

export default function SEO({ title = '', description = '', keywords = '' }) {
  useEffect(() => {
    if (title) document.title = title;

    const setMeta = (name, content) => {
      let el = document.querySelector(`meta[name='${name}']`);
      if (el) el.setAttribute('content', content);
      else {
        el = document.createElement('meta');
        el.name = name;
        el.content = content;
        document.head.appendChild(el);
      }
    };

    if (description) setMeta('description', description);
    if (keywords) setMeta('keywords', keywords);
  }, [title, description, keywords]);

  return null;
}
