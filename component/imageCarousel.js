import React from "react";
import { Carousel } from "antd";
import styled from "styled-components";
import {
  ArrowRightOutlined,
  ArrowLeftOutlined,
  CommentOutlined,
} from "@ant-design/icons";
import Image from "next/image";

const ImageCarousel = ({ post }) => {
  function onChange(a, b, c) {
    console.log(a, b, c);
  }

  return (
    <CarouselWrapper
      accessibility
      arrows
      nextArrow={<ArrowLeftOutlined />}
      prevArrow={<ArrowLeftOutlined />}
      // autoplay
      draggable
    >
      <img
        className="imgimg"
        width={300}
        height={330}
        // fluid
        alt="지도사진"
        src={
          post.img
            ? post.img
            : // : "https://cdn-icons.flaticon.com/png/512/5540/premium/5540531.png?token=exp=1650162938~hmac=72129843982ff4f18bebfb639ee9623d"
              "https://t4.ftcdn.net/jpg/02/51/95/53/240_F_251955356_FAQH0U1y1TZw3ZcdPGybwUkH90a3VAhb.jpg"
        }
      />
      {post.image &&
        post.image.map((v) => (
          <img
            className="imgimg"
            width="100vw"
            height={330}
            key={v.id}
            src={v.url}
          />
        ))}
    </CarouselWrapper>
  );
};

export default ImageCarousel;

const CarouselWrapper = styled(Carousel)`
  // display: flex;

  .imgimg {
    width: 100%;
  }
  // width: 100%;
  .slick-arrow {
    z-index: 1;
    display: block;
  }

  .slick-arrow.slick-prev {
    left: 10px;
    background-color: black;
    font-size: 32px;
    // background:{<ArrowLeftOutlined />;
    // color: black;
  }
  .slick-arrow.slick-next {
    right: 10px;
    background-color: black;
    // color: #fff !important;
  }

  .slick-track {
    display: flex;
  }
`;