import React, { useCallback, useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export const usePrevNextButtons = (emblaApi) => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback((emblaApi) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onSelect]);

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  };
};

export const PrevButton = ({ className = "", children, ...restProps }) => {
  return (
    <button
      className={`hidden md:inline-flex w-10 h-10 bg-white border border-black text-black rounded-full disabled:opacity-50 items-center justify-center mx-2 ${className}`}
      type="button"
      {...restProps}
    >
      <ChevronLeftIcon className="w-5 h-5" />
      {children}
    </button>
  );
};

export const NextButton = ({ className = "", children, ...restProps }) => {
  return (
    <button
      className={`hidden md:inline-flex w-10 h-10 bg-white border border-black text-black rounded-full disabled:opacity-50 items-center justify-center mx-2 ${className}`}
      type="button"
      {...restProps}
    >
      <ChevronRightIcon className="w-5 h-5" />
      {children}
    </button>
  );
};
