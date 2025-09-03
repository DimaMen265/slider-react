import { useState, useEffect, useRef } from "react";
import type { ReactNode } from "react";

type SliderProps = {
    slides: ReactNode[];
    interval?: number;
};

export const Slider: React.FC<SliderProps> = ({ slides, interval = 3000 }) => {
    const [current, setCurrent] = useState<number>(1);
    const [isAnimating, setIsAnimating] = useState<boolean>(true);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const [isPaused, setIsPaused] = useState<boolean>(false);

    const touchStartX = useRef<number | null>(null);
    const touchEndX = useRef<number | null>(null);

    const extendedSlides = [
        slides[slides.length - 1],
        ...slides,
        slides[0],
    ];

    const nextSlide = (): void => {
        if (current >= slides.length) {
            setCurrent(current + 1);
            setTimeout(() => {
                setIsAnimating(false);
                setCurrent(1);
            }, 500);
        } else {
            setIsAnimating(true);
            setCurrent(prev => prev + 1);
        }
    };

    const prevSlide = (): void => {
        if (current <= 0) {
            setCurrent(current - 1);
            setTimeout(() => {
                setIsAnimating(false);
                setCurrent(slides.length);
            }, 500);
        } else {
            setIsAnimating(true);
            setCurrent(prev => prev - 1);
        }
    };

    useEffect(() => {
        if (!isPaused) {
            timerRef.current = setInterval(nextSlide, interval);
        }
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isPaused, interval, current]);

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        touchEndX.current = e.changedTouches[0].clientX;

        if (touchStartX.current !== null && touchEndX.current !== null) {
            const diff = touchStartX.current - touchEndX.current;

            if (diff > 50) {
                nextSlide();
            } else if (diff < -50) {
                prevSlide();
            }
        }

        touchStartX.current = null;
        touchEndX.current = null;
    };

    useEffect(() => {
        if (!isAnimating) {
            requestAnimationFrame(() => {
                setIsAnimating(true);
            });
        }
    }, [isAnimating]);

    return (
        <div
            className="relative w-full max-w-4xl h-[300px] sm:h-[350px] md:h-[400px] overflow-hidden mx-auto rounded-2xl shadow-lg"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            <div
                className={`flex ${isAnimating ? "transition-transform duration-500 ease-in-out" : ""}`}
                style={{ transform: `translateX(-${current * 100}%)` }}
            >
                {extendedSlides.map((slide, index) => (
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
                className="absolute top-1/2 left-2 sm:left-4 -translate-y-1/2 bg-black/50 text-white px-2 sm:px-3 py-1 sm:py-2 rounded-full text-lg sm:text-xl"
            >
                ‹
            </button>
            <button
                onClick={nextSlide}
                className="absolute top-1/2 right-2 sm:right-4 -translate-y-1/2 bg-black/50 text-white px-2 sm:px-3 py-1 sm:py-2 rounded-full text-lg sm:text-xl"
            >
                ›
            </button>

            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                {slides.map((_, i: number) => (
                    <button
                        key={i}
                        onClick={() => setCurrent(i + 1)}
                        className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full ${i + 1 === current ? "bg-white" : "bg-gray-400"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};
