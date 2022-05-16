import React, { useState } from "react";
import { Carousel, Image } from "antd";
import styled from "styled-components";
import {
  ArrowRightOutlined,
  ArrowLeftOutlined,
  CommentOutlined,
} from "@ant-design/icons";

const ImageCarousel = ({ post }) => {
  const [visible, setVisible] = useState(false);
  return (
    <Container>
      <Image.PreviewGroup
        preview={{ visible, onVisibleChange: (vis) => setVisible(vis) }}
      >
        <CarouselWrapper
          accessibility
          arrows
          nextArrow={<ArrowRightOutlined />}
          prevArrow={<ArrowLeftOutlined />}
          // autoplay
          draggable
          infinite={false}
        >
          <Image
            preview={{ visible: false }}
            onClick={() => setVisible(true)}
            className="imgimg"
            width="100%"
            // height={500}
            height={330}
            alt="지도사진"
            src={
              post.img
                ? post.img
                : // : "https://cdn-icons.flaticon.com/png/512/5540/premium/5540531.png?token=exp=1650162938~hmac=72129843982ff4f18bebfb639ee9623d"
                  "https://t4.ftcdn.net/jpg/02/51/95/53/240_F_251955356_FAQH0U1y1TZw3ZcdPGybwUkH90a3VAhb.jpg"
            }
          />
          {/* <div style={{ display: "none" }}> */}
          {post.image &&
            post.image.map((v) => (
              <Image
                className="imgimg"
                width="100%"
                // height={500}
                height={330}
                key={v.id}
                src={v.url}
              />
            ))}
          {/* </div> */}
        </CarouselWrapper>
      </Image.PreviewGroup>
    </Container>
  );
};

export default ImageCarousel;

const CarouselWrapper = styled(Carousel)`
  // display: flex;

  .imgimg {
    width: 100%;
  }

  .slick-arrow {
    z-index: 1;
    display: block;
    
  }

  .slick-arrow.slick-prev {
    left: 10px;
    background-color: transparent;

    color: black;
    font-size: 22px;
    line-height: 1.5715;
  }
  .slick-arrow.slick-next {
    right: 10px;
    background-color: transparent;

    color: black;
    font-size: 22px;
    line-height: 1.5715;
  }

  .slick-track {
    display: flex;
  }

  .ant-carousel {
    .slick-next {
      &::before {
        content: '';
      }
    }
    .slick-prev { 
      &::before {
        content: '';
      }

    }
`;

const Container = styled.div`
  .ant-image-preview-switch-right {
    right: 30%;
  }

  .ant-image-preview-switch-left {
    left: 30%;
  }
`;