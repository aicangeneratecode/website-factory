import type { FAQSectionData } from "../../types/homepageTypes";

export function FAQSection({ data }: { data?: FAQSectionData | null }) {
  if (!data?.faqs?.length) return null;

  return (
    <section className="bg-gray-50 px-5 py-16">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-3xl font-bold sm:text-4xl">{data.title || "Česta pitanja"}</h2>
        {data.subtitle && <p className="mt-3 text-gray-600">{data.subtitle}</p>}
        <div className="mt-8 divide-y divide-gray-200 border-y border-gray-200">
          {data.faqs.map(({ _key, question, answer }) => (
            <details key={_key} className="py-4">
              <summary className="cursor-pointer font-semibold">{question}</summary>
              <p className="mt-3 leading-7 text-gray-700">{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
