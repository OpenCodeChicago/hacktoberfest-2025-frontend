import { useState } from 'react';
import SEO from '../../components/SEO';
import * as Accordion from '@radix-ui/react-accordion';
import { Plus, X } from 'lucide-react';

export default function AboutPage() {
  return (
    <>
      <SEO
        title="About CoreX | CoreX Nutrition"
        description="CoreX Nutrition's About page for this open-source demo project."
      />

      <main
        className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:mx-36"
        role="main"
        aria-labelledby="about-title"
      >
        <div className="max-w-4xl mx-auto">
          <header className="mb-8">
            <h1 className="text-4xl font-semibold mb-16" id="about-title">
              About Core<span className="text-red-600">X</span>
            </h1>
          </header>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-6">
                BORN IN CHICAGO, BUILT FOR PERFORMANCE
              </h2>
              <p className="text-base mb-6 uppercase">
                CoreX was founded in the heart of Chicago with a clear mission:
                to create premium supplements backed by real-world experience
                and science. We're not just another supplement brand — we're
                athletes, trainers, and health professionals who know exactly
                what the body needs to perform, recover, and grow stronger.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-6">
                FROM GLOBAL EXPERIENCE TO LOCAL ROOTS
              </h2>
              <p className="text-base mb-6 uppercase">
                Our founder has spent years working as a personal trainer,
                physical therapist, and strength coach across 10 different
                countries. With a background as a competitive bodybuilder,
                gymnast, and trainer for professional fighters, he's seen
                firsthand what separates good supplements from the great ones.
                That journey, combined with a deep understanding of movement
                science and rehavilitation, inspired CoreX: a company that truly
                puts health and performance first.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-6">
                CHICAGO STRONG, GLOBALLY INSPIRED
              </h2>
              <p className="text-base mb-6 uppercase">
                Though our knowledge spans the globe, our roots run deep in
                Chicago and the Chicagoland area. We carry the city's spirit of
                resilience, hard work, and innovation into every product we
                create. Whether you're training for your first 5k, competing at
                the highest levels, or just looking to live a healthier life —
                CoreX is here to fuel your journey.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-6">
                OUR MISSION
              </h2>
              <p className="text-base font-500 mb-6 uppercase">
                To deliver supplements that don't just promise results but are
                crafted with precision, integrity, and science — designed to
                help you push past limits, recover smarter, and perform at your
                best. At CoreX, we believe every athlete, from weekend warriors
                to professionals, deserves supplements they can trust.
              </p>
            </section>

            <section className="mb-8">
              <p className="text-sm text-gray-900 mb-6">
                Please take a moment to read through all the steps below. Once you're ready, feel free to follow them at your own pace.
              </p>
              <AboutAccordion />
            </section>
        </div>
      </main>
    </>
  );
}

const AboutAccordion = () => {
  const [openItems, setOpenItems] = useState(['item-1']);
  const isOpen = (value) => openItems.includes(value);
  
  return (
    <Accordion.Root
      type="multiple"
      value={openItems}
      onValueChange={setOpenItems}
      className="rounded-2xl border border-gray-200 px-12 py-6"  
    >
      <Accordion.Item className="AccordionItem" value="item-1">
        <Accordion.Header>
        <Accordion.Trigger className="flex w-full justify-between text-xl uppercase data-[state=open]:text-blue-800 data-[state=closed]:text-blue-950 data-[state=open]:opacity-80 cursor-pointer">
            <span>1. Access the website</span>
            {isOpen('item-1') ? <X className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content className="text-base font-normal mt-4">
          <p className="mb-2">Click the link below to visit our store:</p>
          <a href='https://corexshop.com' target='_blank' >https://corexshop.com</a>
          <p className="mt-2">(This will open a new tab with the homepage.)</p>
        </Accordion.Content>
      </Accordion.Item>

      <hr className="border-gray-200 my-4"/>

      <Accordion.Item className="AccordionItem" value="item-2">
        <Accordion.Header>
        <Accordion.Trigger className="flex w-full justify-between text-xl uppercase data-[state=open]:text-blue-800 data-[state=closed]:text-blue-950 data-[state=open]:opacity-80 cursor-pointer">
            <span>2. Browse Products</span>
            {isOpen('item-2') ? <X className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content className="text-base font-normal mt-4">
          <p>Explore our collections like Pre-Workout, Build Muscle, and more.</p>
          <p className="mt-2">Use filters to find products by category or benefit.</p>
        </Accordion.Content>
      </Accordion.Item>

      <hr className="border-gray-200 my-4"/>

      <Accordion.Item className="AccordionItem" value="item-3">
        <Accordion.Header>
        <Accordion.Trigger className="flex w-full justify-between text-xl uppercase data-[state=open]:text-blue-800 data-[state=closed]:text-blue-950 data-[state=open]:opacity-80 cursor-pointer">
            <span className="text-xl uppercase">3. Add to cart</span>
            {isOpen('item-3') ? <X className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content className="text-base font-normal mt-4">
          <p>When you find something you like, click "Add to Cart".</p>
          <p className="mt-2">Your selected items will appear in the cart, ready for checkout.</p>
        </Accordion.Content>
      </Accordion.Item>

      <hr className="border-gray-200 my-4"/>
      
      <Accordion.Item className="AccordionItem" value="item-4">
        <Accordion.Header>
          <Accordion.Trigger className="flex w-full justify-between text-xl uppercase data-[state=open]:text-blue-800 data-[state=closed]:text-blue-950 data-[state=open]:opacity-80 cursor-pointer">
            <span>4. Checkout (Demo)</span>
            {isOpen('item-4') ? <X className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content className="text-base font-normal mt-4">
          <p>You can proceed to checkout to see how the flow works.</p>
          <p className="mt-2">Please note: This is a demo-only product. No payments are processed — this is part of our open source learning initiative with Open Code Chicago.</p>
        </Accordion.Content>
      </Accordion.Item>

      <hr className="border-gray-200 my-4"/>
      
      <Accordion.Item className="AccordionItem" value="item-5">
        <Accordion.Header>
        <Accordion.Trigger className="flex w-full justify-between text-xl uppercase data-[state=open]:text-blue-800 data-[state=closed]:text-blue-950 data-[state=open]:opacity-80 cursor-pointer">
            <span>5. Contribute & Collaborate</span>
            {isOpen('item-5') ? <X className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content className="text-base font-normal mt-4">
          <p className="mb-2">Want to improve this project?</p>
          <ul className="list-disc list-inside">
            <li className="ml-2">Visit our GitHub repo.</li>
            <li className="ml-2">Check open issues (features, bugs, or docs).</li>
            <li className="ml-2">Pick a task, follow contribution guidelines, and submit a PR.</li>
          </ul>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  )
}