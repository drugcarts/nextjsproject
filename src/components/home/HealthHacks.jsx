import Image from "next/image";
import { IMAGES } from "@/components/common/images";

const hacks = [
  {
    img: IMAGES.HACKS1,
    alt: "Healthy Eating Hacks with Natural Foods",
    title: "Life Hacks for Healthy Eating",
    points: ["Tips for healthy eating", "Healthy food hacks at home"],
  },
  {
    img: IMAGES.HACKS2,
    alt: "Daily Nutrition Hacks for a Balanced Diet",
    title: "Quick Nutrition Tips",
    points: ["Smart food choices", "Balanced diet strategies"],
  },
  {
    img: IMAGES.HACKS3,
    alt: "Simple Wellness Routines for a Healthy Life",
    title: "Wellness & Daily Routines",
    points: ["Daily wellness habits", "Simple self-care tips"],
  },
];

const HealthHacks = () => {
  return (
    <section className="px-10 mt-3" aria-labelledby="health-hacks-title">
      <div className="p-2 font-semibold mb-2 mt-2 text-lg">
        <h2 id="health-hacks-title">Health Hacks</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 px-0 md:px-20 gap-3">
        {hacks.map((hack, index) => (
          <article
            key={index}
            className="border border-gray-300 p-3 rounded-lg"
            role="listitem"
          >
            <div
              className="flex justify-center"
              itemScope
              itemType="https://schema.org/HowTo"
            >
              <Image
                src={hack.img}
                alt={hack.alt}
                title={hack.title}
                width={96}
                height={96}
                className="w-24 h-24 object-cover"
              />
              <div className="ml-2">
                <h3 className="font-bold text-sm" itemProp="name">
                  {hack.title}
                </h3>
                <ul className="ml-5 mt-3 text-xs list-disc leading-6">
                  {hack.points.map((point, i) => (
                    <li key={i} itemProp="step">
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default HealthHacks;
