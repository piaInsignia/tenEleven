"use client";
import { useState, ReactNode } from "react";

type SimpleSliderProps<T> = {
  data: T[];
  renderSlide: (item: T) => ReactNode;
};

export default function SimpleSlider<T>({
  data,
  renderSlide,
}: SimpleSliderProps<T>) {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((current + 1) % data.length);
  const prev = () => setCurrent((current - 1 + data.length) % data.length);

  return (
    <div className="max-w-sm mx-auto bg-white rounded-lg text-center">
      {renderSlide(data[current])}

      <div className="flex justify-center gap-2 mb-4 mt-5">
        {data.map((_, idx) => (
          <span
            key={idx}
            className={`h-2 w-2 rounded-full ${
              idx === current ? "bg-[#F05125]" : "bg-[#FCDCD3]"
            }`}
          />
        ))}
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={prev}
          className="px-4 py-2 rounded-full bg-[#FCDCD3] text-white"
        >
          ←
        </button>
        <button
          onClick={next}
          className="px-4 py-2 rounded-full bg-[#F05125] text-white"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
