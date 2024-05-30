"use client";
import FeedbackCard from "@/lib/components/card/FeedbackCard";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./style.css";

export default function FeedbackSection() {
  return (
    <section className="my-12">
      <div className="container text-center">
        <h2>Hear from the Clients</h2>
        <p>NFT will open thousands of new opportunities for this new generation. I feel so proud and blessed that I have seen and taken advantage of many great opportunities in this world before millions of people have seen them.</p>
        <div className="mt-10">
          <Swiper
            slidesPerView={1}
            spaceBetween={10}
            pagination={{
              clickable: true,
            }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            breakpoints={{
              '@0.00': {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              '@0.75': {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              '@1.00': {
                slidesPerView: 3,
                spaceBetween: 40,
              }
            }}
            modules={[Autoplay, Pagination]}
            className="mySwiper"
          >
            <SwiperSlide className="!bg-transparent"><FeedbackCard creator="Nick Green" role="Developer" avatar="/asset/avatar.png" /></SwiperSlide>
            <SwiperSlide className="!bg-transparent"><FeedbackCard creator="Nick Green" role="Developer" avatar="/asset/avatar.png" /></SwiperSlide>
            <SwiperSlide className="!bg-transparent"><FeedbackCard creator="Nick Green" role="Developer" avatar="/asset/avatar.png" /></SwiperSlide>
            <SwiperSlide className="!bg-transparent"><FeedbackCard creator="Nick Green" role="Developer" avatar="/asset/avatar.png" /></SwiperSlide>
            <SwiperSlide className="!bg-transparent"><FeedbackCard creator="Nick Green" role="Developer" avatar="/asset/avatar.png" /></SwiperSlide>
            <SwiperSlide className="!bg-transparent"><FeedbackCard creator="Nick Green" role="Developer" avatar="/asset/avatar.png" /></SwiperSlide>
          </Swiper>
          
        </div>
      </div>
    </section>
  );
}