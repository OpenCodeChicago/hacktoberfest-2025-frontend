export default function BottomFooter() {
  // Payment logos. Replace or add entries as needed. (You provided the Amazon CDN URL.)
  const paymentLogos = [
    {
      name: 'Amazon',
      href: 'https://www.amazon.com',
      src: 'https://cdn-icons-png.flaticon.com/512/5968/5968269.png',
    },
    {
      name: 'AM EX',
      href: 'https://icon2.cleanpng.com/20180810/uso/bbd4a303dbe657ecf8304b7b0b5145e0.webp',
      src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLTHuULYXTweiF0qwt9JYVRkLmldDoTBnaUw&s',
    },
    {
      name: 'Apple Pay',
      href: 'https://thumbnail.imgbin.com/11/0/10/apple-pay-logo-zgRR8rE3_t.jpg',
      src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Apple_Pay_logo.svg/2560px-Apple_Pay_logo.svg.png',
    },
    {
      name: 'Google Pay',
      href: 'https://toppng.com/uploads/small/11735759504pvxnd3mon8eobctp8qktesr6ayeytipihdlcxiotspns27ljc8xuhkl76cxstyyuftl5e38e1pq1tycfmezlpbrmtro5v5rglc58.webp',
      src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Google_Pay_Logo.svg/640px-Google_Pay_Logo.svg.png',
    },
    {
      name: 'Mastercard',
      href: 'https://icon2.cleanpng.com/lnd/20241123/ca/85dda930e3465f586e2b20700028d0.webp',
      src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1200px-Mastercard-logo.svg.png',
    },
    {
      name: 'Pay Pal',
      href: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3no113HIfYGlfiWW58lJVwmAXif0Plr9Jkg&s',
      src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeyP_0YtjGAPJnOyzHmO-qQ82oXl_v4nIoFw&s',
    },
    {
      name: 'Shop Pay',
      href: 'https://digiteon.com/wp-content/uploads/2025/05/about-shop-pay.jpg',
      src: 'https://digiteon.com/wp-content/uploads/2025/05/about-shop-pay.jpg',
    },
    {
      name: 'Visa',
      href: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png',
      src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png',
    },
  ];

  return (
    <footer className="bg-[#071827] text-neutral-200">
      {/* Top disclaimer bar */}
      <div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm text-neutral-200/90">
        <p className="max-w-4l mx-auto">
          **The Food and Drug Administration has not evaluated these statements.
          This product is not meant to diagnose, treat, cure, or prevent any
          illness.
        </p>
      </div>

      {/* Bottom footer area */}
      <div className="max-w-7xl mx-auto px-6 py-12 border-t border-neutral-800">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
          {/* Left block: copyright + powered by + links */}
          <div className="flex-1">
            <div className="mb-6">
              <p className="text-xl md:text-xl leading-tight font-bold">
                © 2025{' '}
                <span className="font-black">
                  Core<span className="text-red-500">X</span> Nutrition
                </span>
              </p>
              {/* Replace p with a link that uses the animated underline */}
              Powered by:{' '}
              <span className="font-semibold">
                <a
                  href="https://opencodechicago.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline-inverse mt-2 inline-block text-base md:text-lg text-neutral-300"
                >
                  Open Code Chicago
                </a>
              </span>
            </div>

            <div className="flex flex-wrap gap-6 text-base text-neutral-300">
              <a href="/return-policy" className="link-underline text-sm">
                Refund policy
              </a>
              <a href="/privacy-policy" className="link-underline text-sm">
                Privacy policy
              </a>
              <a href="/terms-of-service" className="link-underline text-sm">
                Terms of service
              </a>
              <a href="/shipping-policy" className="link-underline text-sm">
                Shipping policy
              </a>
            </div>
          </div>

          {/* Right block: payment icons */}
          <div className="flex items-center justify-end gap-4">
            {paymentLogos.length > 0 &&
              paymentLogos.map((logo) => (
                <a
                  key={logo.name}
                  href={logo.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={logo.name}
                  className="inline-flex items-center"
                >
                  <img
                    src={logo.src}
                    alt={logo.name}
                    className="h-6 w-auto object-contain bg-white rounded-sm p-1"
                    loading="lazy"
                  />
                </a>
              ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
