import { FaRegCopyright } from 'react-icons/fa6';

export default function BottomFooter() {
  return (
    <footer className="bg-[#071827] text-neutral-200 ">
      {/* Top disclaimer bar */}
      <div className="max-w-7xl mx-auto px-5 md:px-0 py-6 text-center text-sm text-neutral-200/90">
        <p className="max-w-4l mx-auto">
          **The Food and Drug Administration has not evaluated these statements.
          This product is not meant to diagnose, treat, cure, or prevent any
          illness.
        </p>
      </div>

      {/* Bottom footer area */}
      <div className="max-w-7xl mx-auto px-5 md:px-0 py-12 border-t border-neutral-800">
        <div className="flex flex-col md:flex-row items-center md:items-start md:justify-between">
          {/* Left block: copyright + powered by + links */}
          <div className="w-full flex flex-col md:flex-row md:justify-between align-bottom md:flex-1 gap-12">
            <div className="flex flex-col gap-2 justify-center md:justify-start self-center md:self-center">
              <p className="text-m leading-tight font-bold flex items-center justify-center md:justify-start gap-2">
                <FaRegCopyright /> {new Date().getFullYear()}{' '}
                <span className="font-black">
                  Core<span className="text-red-500">X</span> Nutrition
                </span>
              </p>
              {/* Replace p with a link that uses the animated underline */}
              <div className="flex items-center gap-2">
                <p>Powered by: </p>
                <a
                  href="https://opencodechicago.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline-inverse inline-block text-base text-neutral-300 font-semibold"
                >
                  Open Code Chicago
                </a>
              </div>
            </div>

            <div className="flex flex-wrap align-center gap-4 text-base text-neutral-300 self-center md:self-auto">
              <a
                href="/return-policy"
                className="link-underline text-[10px] md:text-[12px]"
              >
                Refund policy
              </a>
              <a
                href="/privacy-policy"
                className="link-underline text-[10px] md:text-[12px]"
              >
                Privacy policy
              </a>
              <a
                href="/terms-of-service"
                className="link-underline text-[10px] md:text-[12px]"
              >
                Terms of service
              </a>
              <a
                href="/shipping-policy"
                className="link-underline text-[10px] md:text-[12px]"
              >
                Shipping policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
