import React, { useState } from "react";
import styled from "styled-components";
import BadgeModal from "./badgeModal";

const BadgeBook = () => {
  const [isModal, setIsModal] = useState(false);

  const showModal = () => {
    setIsModal(true);
    console.log(isModal);
  };

  const openModal = () => {
    setIsModal((prev) => !prev);
    console.log(isModal);
  };

  return (
    <Container className="badge_book">
      {/* <div className="follow_chart"> */}
      <img src="/badgeBook2.png" onClick={showModal} />
      {/* <p>Badge</p> */}
      {/* </div> */}
      <BadgeModal isModal={isModal} openModal={openModal} />
    </Container>
  );
};

export default BadgeBook;

const Container = styled.span`
  //   .badge_title {
  //     position: absolute;
  //     left: 50%;
  //     top: 15px;
  //     z-index: 5;
  //     // transform: translateX(-50%);
  //     font-size: 22px;
  //     transform-origin: 50 0%;
  //     transform: rotateY(0);
  //     transition: all 0.45s ease;
  //   }

  margin-right: 20px;
  position: relative;
  bottom: 4px;

  &:hover {
    cursor: pointer;
  }

  img {
    width: 40px;
    height: 40px;
  }

  // .follow_chart {
  //   position: absolute;

  //   p {
  //     position: absolute;
  //     bottom: 31%;
  //     left: 52px;
  //     color: #fff;
  //     font-size: 22px;
  //     font-weight: bold;
  //   }

  //   p:hover {
  //     cursor: pointer;
  //   }
  // }

  // & {
  //   display: inline-block;
  //   // width: 300px;
  //   // height: 370px;
  //   width: 58px;
  //   height: 76px;
  //   width: 100px;
  //   height: 118px;
  //   border: 1px solid grey;
  //   background: #fff;

  //   // float: right;
  //   cursor: pointer;

  //   border-top-right-radius: 5px;
  //   border-bottom-right-radius: 5px;

  //   position: relative;
  //   z-index: 1;
  //   box-shadow: 0 2px 4px 0 rgba(#000, 0.1), 0 9px 20px 0 rgba(#000, 0.25);
  //   overflow: hidden;
  //   transition: box-shadow 0.3s linear;

  //   img {
  //     width: inherit;
  //     height: inherit;
  //     transform-origin: 0 50%;
  //     transform: rotateY(0);
  //     transition: all 0.45s ease;
  //   }
  // }

  // &:hover {
  //   box-shadow: 0 2px 4px 0 rgba(#000, 0.25), 0 9px 20px 0 rgba(#000, 0.45);
  //   cursor: pointer;
  //   img {
  //     transform: rotateY(-25deg);
  //     box-shadow: 1px 1px 5px 5px rgba(#000, 0.2);
  //   }

  //   .badge_title {
  //     //   transform: rotateY(-25deg);
  //     transform: rotateY(-40deg);
  //   }
  // }

  // &::before,
  // &::after {
  //   content: "";
  //   display: block;
  //   width: inherit;
  //   height: inherit;
  //   position: absolute;
  //   top: 0;
  //   z-index: -1;
  //   border: 1px solid grey;

  //   border-top-right-radius: 5px;
  //   border-bottom-right-radius: 5px;
  // }

  // &::before {
  //   left: -3px;
  // }

  // &::after {
  //   left: -6px;
  // }

  //   .badge_book {
  //     display: block;
  //     width: 150px;
  //     height: 220px;
  //     border: 1px solid grey;
  //     background: #fff;

  //     // float: right;
  //     cursor: pointer;

  //     border-top-right-radius: 5px;
  //     border-bottom-right-radius: 5px;

  //     position: relative;
  //     z-index: 1;
  //     box-shadow: 0 2px 4px 0 rgba(#000, 0.1), 0 9px 20px 0 rgba(#000, 0.25);
  //     overflow: hidden;
  //     transition: box-shadow 0.3s linear;

  //     img {
  //       width: inherit;
  //       height: inherit;
  //       transform-origin: 0 50%;
  //       transform: rotateY(0);
  //       transition: all 0.45s ease;
  //     }
  //   }

  //   .badge_book:hover {
  //     box-shadow: 0 2px 4px 0 rgba(#000, 0.25), 0 9px 20px 0 rgba(#000, 0.45);
  //     cursor: pointer;
  //     img {
  //       transform: rotateY(-25deg);
  //       box-shadow: 1px 1px 5px 5px rgba(#000, 0.2);
  //     }

  //     .badge_title {
  //       //   transform: rotateY(-25deg);
  //       transform: rotateY(-40deg);
  //     }
  //   }

  //   .badge_book::before,
  //   .badge_book::after {
  //     content: "";
  //     display: block;
  //     width: inherit;
  //     height: inherit;
  //     position: absolute;
  //     top: 0;
  //     z-index: -1;
  //     border: 1px solid grey;

  //     border-top-right-radius: 5px;
  //     border-bottom-right-radius: 5px;
  //   }

  //   .badge_book::before {
  //     left: -3px;
  //   }

  //   .badge_book::after {
  //     left: -6px;
  //   }
`;
