import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination as SwiperPagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

interface ImageSwiperProps {
  images: string[]
  title: string
}

export function ImageSwiper({ images, title }: ImageSwiperProps) {
  return (
    <Swiper
      modules={[Navigation, SwiperPagination]}
      navigation
      pagination={{ clickable: true }}
      spaceBetween={10}
      slidesPerView={1}
      className="image-swiper"
    >
      {images.map((image, index) => (
        <SwiperSlide key={image}>
          <img
            src={image}
            alt={`${title} — фото ${index + 1}`}
            className="image-swiper__slide"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
