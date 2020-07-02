import React from "react";
import styled from "styled-components";
import { Grid, Button } from "@material-ui/core";
import { connect } from "react-redux";
import * as cartAction from "../crunch_cart/action";

// import OrderImg from "../../../public/img/fill-48.png";
const Container = styled.div`
  /* border: 2px solid black; */
  width: 282px;
  height: 204px;
  position: sticky;
  top: 100px;
  right: 0px;
  left: 0px;
  margin-left: 24px;
  margin-top: 133px;

  @media (max-width: 1199px) {
    width: 100%;
    height: 179px;
    position: sticky;
    top: 200px;
    right: 0px;
    left: 0px;
  }
  @media (max-width: 767px) {
    display: none;
  }
`;

const Price = styled.div`
  background: white;
  width: 100%;
`;

const OrderButton = styled.button`
  /* border: 2px solid black; */
  width: 100%;
  height: 48px;
  border-radius: 7px;
  @media (max-width: 767px) {
    width: 170px;
    height: 40px;
  }
`;

const GoodsPrice = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0px 8px;
  margin: 20px 0px;
  text-align: center;
  align-items: center;

  @media (max-width: 1199px) {
    margin: 16px 0px;
    display: flex;
    justify-content: space-between;
    text-align: center;
    align-items: center;
    padding: 0px 8px;
  }
`;

const Border = styled.div`
  width: 100%;
  height: 2px;
  background-color: #02da77;

  @media (max-width: 767px) {
    width: 170px;
    height: 2px;
  }
`;

const ButtonP = styled.button`
  margin-top: 16px;
  width: 100%;
  height: 48px;
  border-radius: 4px;
  background-color: #02da77;
  border: none;
  @media (max-width: 1199px) {
    width: 100%;
    height: 40px;
  }
`;
const ButtonName = styled.span`
  color: white;
  width: 59px;
  height: 24px;
  font-family: NotoSansCJKkr;
  font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
`;

const LeftText = styled.div`
  /* width: 42px; */
  height: 20px;
  font-family: NotoSansCJKkr;
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
  @media (max-width: 1199px) {
    width: 51px;
    height: 13px;
    font-family: NotoSansCJKkr;
    font-size: 12.6px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1;
    letter-spacing: normal;
    color: var(--color-black-2);
    display: flex;
    justify-content: flex-start;
  }
`;

const RightText = styled.div`
  height: 16px;
  font-family: NotoSansCJKkr;
  font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  text-align: center;
  @media (max-width: 1199px) {
    width: 75px;
    height: 17px;
    font-family: NotoSansCJKkr;
    font-size: 13px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.31;
    letter-spacing: normal;
    color: var(--color-black-1);
    display: flex;
    justify-content: flex-end;
  }
`;

const Payment = styled.div`
  height: 24px;
  font-family: NotoSansCJKkr;
  font-size: 20px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.2;
  letter-spacing: normal;
  color: #02da77;
  @media (max-width: 1199px) {
    width: 96px;
    height: 20px;
    font-family: NotoSansCJKkr;
    font-size: 14px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
    display: flex;
    justify-content: flex-end;
    color: var(--color-green-1);
  }
`;
const MobilePay = styled.div`
  background: white;
  z-index: 99;
  bottom: 0;
  right: 0;
  height: 80px;
  width: 100%;
  padding: 0;
  position: fixed;
  @media (min-width: 1199px) {
    display: none;
  }
`;

const MobileOrder = styled.div`
  margin: 16px 20px 16px 20px;
  justify-content: center;
  align-items: center;
  display: flex;
  background: #02da77;
  border-radius: 24px;
  width: 88.9%;
  height: 48px;
  @media (min-width: 768px) {
    display: none;
  }
`;

const MobileOrderText = styled.div`
  color: white;
  width: 176px;
  margin: auto;
  font-family: NotoSansCJKkr;
  font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;

  @media (min-width: 768px) {
    display: none;
  }
`;

const TotalPrice = (props) => {
  const {
    data,
    totalDiscountPrice,
    totalDeliveryPrice,
    totalFinalPrice,
  } = props;

  return (
    <div style={{ height: "86%" }}>
      <Container className="TotalPrice">
        <Price>
          <Border></Border>
          <GoodsPrice>
            <LeftText>상품금액 </LeftText>
            <RightText>{data[0].sumText}</RightText>
          </GoodsPrice>
          <GoodsPrice>
            <LeftText>배송비</LeftText>
            <RightText>{data[2].sumText}</RightText>
          </GoodsPrice>
          <GoodsPrice>
            <LeftText>결제금액</LeftText>
            <Payment>총 {data[3].sumText}</Payment>
          </GoodsPrice>
          <Border></Border>
        </Price>
        <ButtonP className="TotalPriceBtn">
          <ButtonName>주문하기</ButtonName>
        </ButtonP>
      </Container>

      <MobilePay>
        <MobileOrder>
          <MobileOrderText>{data[3].sumText} 구매하기</MobileOrderText>
        </MobileOrder>
      </MobilePay>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeCount: (sno, cnt) => dispatch(cartAction.changeCount(sno, cnt)),
  };
};

export default connect(null, mapDispatchToProps)(TotalPrice);
