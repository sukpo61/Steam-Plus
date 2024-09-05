import Image from 'next/image';
import { useState } from 'react';
import SwiperCore from 'swiper'; // 타입지정을 위해 필요하다.
import 'swiper/css';
import { EffectFade } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export const PhotoGallery = ({ imageData }: any) => {
    const [swiper, setSwiper] = useState<SwiperCore>();
    const slideTo = (index: number) => swiper?.slideTo(index);

    return (
        <div className="flex w-full flex-col gap-2">
            <section className="relative aspect-video w-full">
                <Swiper
                    modules={[EffectFade]}
                    onSwiper={setSwiper}
                    initialSlide={0}
                    effect="fade"
                    className="h-full w-full"
                >
                    {imageData.map((image: any) => (
                        <SwiperSlide key={image.id} className="h-full w-full">
                            <div className="relative h-full w-full">
                                <Image
                                    src={image.path_full}
                                    alt="screenshot"
                                    layout="fill"
                                    objectFit="cover"
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </section>
            <section className="flex w-full gap-2 overflow-x-auto pb-1">
                {imageData.map((image: any, index: number) => (
                    <div
                        key={image.id}
                        className="flex-shrink-0 cursor-pointer"
                        onClick={() => slideTo(index)}
                    >
                        <div className="w-[120px]">
                            <Image
                                src={image.path_thumbnail}
                                alt="screenshot"
                                width={120}
                                height={0}
                            />
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
};
