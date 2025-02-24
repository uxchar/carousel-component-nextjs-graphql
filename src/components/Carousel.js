import React from "react";
import { gql, useQuery } from "@apollo/client";
import useEmblaCarousel from "embla-carousel-react";
import { DotButton, useDotButton } from "./EmblaCarouselDotButton";
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";
import Image from "next/image";

const GET_CAROUSEL_SLIDES = gql`
  query GetCarouselSlides {
    carouselSlides {
      id
      title
      description
      imageUrl
    }
  }
`;

const Carousel = ({ options }) => {
  const { data, loading, error } = useQuery(GET_CAROUSEL_SLIDES);
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  if (loading) return <p>Loading slides...</p>;
  if (error) return <p>Error loading slides: {error.message}</p>;

  const slides = data.carouselSlides;

  return (
    <div className="w-full flex flex-col items-center">
      {/* carousel wrapper */}
      <div className="relative mx-auto w-[90%] max-w-md sm:max-w-2xl md:max-w-2xl lg:max-w-4xl">
        {/* prev arrow button */}
        <PrevButton
          onClick={onPrevButtonClick}
          disabled={prevBtnDisabled}
          className="absolute left-[-60px] top-1/2 -translate-y-1/2 hidden md:flex z-50"
        />

        {/* carousel container */}
        <div className="overflow-hidden rounded-md" ref={emblaRef}>
          <div className="flex">
            {slides.map((slide) => (
              <div
                key={slide.id}
                className="flex-shrink-0 w-full h-[300px] sm:h-[350px] md:h-[400px] flex bg-white shadow-md rounded-lg overflow-hidden"
              >
                {/* left side: text and button */}
                <div className="w-1/2 flex flex-col justify-center p-4 md:p-6 bg-gray-100 gap-4">
                  <h2 className="text-sm sm:text-base md:text-lg font-bold text-gray-950">
                    {slide.title}
                  </h2>
                  <p className="mt-2 text-gray-700 text-xs sm:text-sm md:text-base">
                    {slide.description}
                  </p>
                  <button className="mt-3 shadow-sm bg-gray-950 text-white text-xs sm:text-sm py-3 px-3 rounded">
                    Learn More
                  </button>
                </div>

                {/* right side: image */}
                <div className="w-1/2 relative">
                  <Image
                    src={slide.imageUrl}
                    alt={slide.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-r-md"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* next arrow button */}
        <NextButton
          onClick={onNextButtonClick}
          disabled={nextBtnDisabled}
          className="absolute right-[-60px] top-1/2 -translate-y-1/2 hidden md:flex"
        />
      </div>

      {/* dot navigation */}
      <div className="mt-4 flex justify-center space-x-2">
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            onClick={() => onDotButtonClick(index)}
            className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full border border-black transition-all ${
              index === selectedIndex ? "bg-gray-700" : "bg-white"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
