import { useState, useEffect, useRef } from "react";
import type { ReactNode } from "react";


type SliderProps = {
    slides: ReactNode[];
    interval?: number; // час у мс між автоперемиканням
};

export const Slider: React.FC<SliderProps> = ({ slides, interval = 3000 }) => {
    const [current, setCurrent] = useState<number>(0);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const [isPaused, setIsPaused] = useState<boolean>(false);

    const nextSlide = (): void => {
        setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = (): void => {
        setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    useEffect(() => {
        if (!isPaused) {
            timerRef.current = setInterval(nextSlide, interval);
        }
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isPaused, interval]);

    return (
        <div
            className="relative w-[800px] h-[400px] overflow-hidden mx-auto rounded-2xl shadow-lg"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${current * 100}%)` }}
            >
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className="w-full h-full flex-shrink-0 flex items-center justify-center bg-gray-100"
                    >
                        {slide}
                    </div>
                ))}
            </div>

            <button
                onClick={prevSlide}
                className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/50 text-white px-3 py-2 rounded-full"
            >
                ‹
            </button>
            <button
                onClick={nextSlide}
                className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/50 text-white px-3 py-2 rounded-full"
            >
                ›
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {slides.map((_, i: number) => (
                    <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className={`w-3 h-3 rounded-full ${i === current ? "bg-white" : "bg-gray-400"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};
