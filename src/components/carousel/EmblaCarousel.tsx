import { EmblaOptionsType } from 'embla-carousel';
import Fade from 'embla-carousel-fade';
import Image from 'next/image';
import React from 'react';
import { useDotButton } from './EmblaCarouselDotButton';
import useEmblaCarousel from 'embla-carousel-react';
import { usePrevNextButtons } from './EmblaCarouselArrowButtons';

type PropType = {
    slides: any[];
    options?: EmblaOptionsType;
};

export const Carousel: React.FC<PropType> = (props) => {
    const { slides, options = { loop: true, duration: 30 } } = props;
    const [emblaRef, emblaApi] = useEmblaCarousel(options, [Fade()]);

    const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);

    const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
        usePrevNextButtons(emblaApi);

    return (
        <div className="flex h-full w-full">
            <div className="flex h-full w-full overflow-hidden" ref={emblaRef}>
                <div className="flex h-full w-full touch-pan-y">
                    {slides.map((image: any) => (
                        <div className="flex h-full w-full min-w-0 flex-none" key={image.path_full}>
                            <div className="relative h-full w-full">
                                <Image
                                    src={image.path_full}
                                    alt="screenshot"
                                    layout="fill"
                                    objectFit="cover"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* <div className="embla__controls">
                <div className="embla__buttons">
                    <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
                    <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
                </div>

                <div className="embla__dots">
                    {scrollSnaps.map((_, index) => (
                        <DotButton
                            key={index}
                            onClick={() => onDotButtonClick(index)}
                            className={'embla__dot'.concat(
                                index === selectedIndex ? 'embla__dot--selected' : '',
                            )}
                        />
                    ))}
                </div>
            </div> */}
        </div>
    );
};
