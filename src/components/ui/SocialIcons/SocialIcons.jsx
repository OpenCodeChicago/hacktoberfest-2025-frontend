import { useRef } from 'react';
import { FaXTwitter } from 'react-icons/fa6';
import { FaFacebook, FaYoutube, FaLinkedin } from 'react-icons/fa';

const ICONS = [
  {
    id: 'youtube',
    Icon: FaYoutube,
    href: 'https://www.youtube.com/@AlexSmaginDev',
    label: 'YouTube Channel',
  },
  {
    id: 'linkedin',
    Icon: FaLinkedin,
    href: 'https://www.linkedin.com/company/104436074',
    label: 'LinkedIn',
  },
  {
    id: 'x',
    Icon: FaXTwitter,
    href: 'https://x.com/alexsmagin29',
    label: 'X',
  },
  {
    id: 'facebook',
    Icon: FaFacebook,
    href: 'https://www.facebook.com/profile.php?id=61580367112591',
    label: 'Facebook',
  },
];

export default function SocialIcons() {
  const iconRefs = useRef([]);

  const handleMouseMove = (e, idx) => {
    const el = iconRefs.current[idx];
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const offsetX = e.clientX - centerX;
    const offsetY = e.clientY - centerY;

    const clamp = (v, m) => Math.max(-m, Math.min(m, v));
    const maxOffset = 14; // px
    const tx = clamp(offsetX * 0.35, maxOffset);
    const ty = clamp(offsetY * 0.25, maxOffset);

    // sub-rotation for stitching feel
    const rotate = (tx / maxOffset) * 8;

    el.style.transform = `translate(${tx}px, ${ty}px) rotate(${rotate}deg) scale(1.08)`;
  };

  const handleMouseEnter = (idx) => {
    const el = iconRefs.current[idx];
    if (!el) return;
    el.style.transition = 'transform 80ms linear';
  };

  const handleMouseLeave = (idx) => {
    const el = iconRefs.current[idx];
    if (!el) return;
    el.style.transition = 'transform 280ms cubic-bezier(.2,.9,.3,1)';
    el.style.transform = 'translate(0,0) rotate(0deg) scale(1)';
  };

  return (
    <ul
      role="list"
      aria-label="Social links"
      className="flex items-center space-x-6 relative z-10 pointer-events-auto"
    >
      {ICONS.map((item, idx) => {
        const { id, Icon: IconComponent, href, label } = item;
        return (
          <li key={id}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              title={label}
              aria-label={label}
              className="transform transition-transform duration-200 hover:scale-110 hover:text-gray-300 height-[18px] flex items-center justify-center"
              onMouseMove={(e) => handleMouseMove(e, idx)}
              onMouseEnter={() => handleMouseEnter(idx)}
              onMouseLeave={() => handleMouseLeave(idx)}
            >
              <span
                ref={(el) => (iconRefs.current[idx] = el)}
                className="inline-flex items-center justify-center"
                aria-hidden="true"
              >
                <IconComponent size={18} />
              </span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
