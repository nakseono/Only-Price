import React, { useState, useEffect } from 'react';
import { Grid, Container, useMediaQuery } from '@material-ui/core';
import { connect } from 'react-redux';
import {
  changeCount,
  changeAdditionalCount,
  deleteSingleCart,
  deleteCart,
} from '../crunch_cart/action';
import { withRouter } from 'react-router-dom';
import { getMoneyString } from '../utils/stringutils';
import xbutton from './img/x-small.svg';

// import * as action from './action'

const ItemEntry = (props) => {
  const mobile = useMediaQuery('(max-width:767px')
  const tablet = useMediaQuery('(max-width:1199px)');

  const {
    checkList,
    handleCheck,
    cartData,
    changeCount,
    CartReducer,
    handleScmCheck,
    data
  } = props;
  
  const [count , setCount] = useState(cartData.goodsCnt);
  
  useEffect(()=>{
    console.log(mobilePrice);
  })

  // 전체 요금을 확인 하기 위한 변수 
  let itemTotalPrice = ((parseInt(cartData.price.goodsPrice)) * count) ;
  itemTotalPrice = getMoneyString(itemTotalPrice);

  let mobilePrice =  ((parseInt(cartData.price.goodsPrice)) * count) ;


  // 1) 처음 렌더될때는 dis_cost
  // 2) count에 변화가 생기면 itemTotalPrice 적용 

  // select 수량 체크 함수
  const handleChange = (event) => {
    event.preventDefault();
    setCount(event.target.value);
    changeCount(
      cartData.sno,
      event.target.value,
      cartData.scmNo,
      cartData.deliverySno
    ); // 스토어에서의 아이템 변동
  };

  const optionImageData = cartData.optionText
    ? cartData.optionText.filter((x) => x.optionName === '옵션이미지')
    : [];
  const optionImage =
    optionImageData.length > 0 &&
    optionImageData[0].optionValue.includes('http')
      ? optionImageData[0].optionValue
      : cartData.goodsImage;
  const inSales =
    cartData.price.fixedPrice &&
    parseInt(cartData.price.goodsPrice) !== parseInt(cartData.price.fixedPrice);
  const fixedPrice = inSales
    ? getMoneyString(parseInt(cartData.price.fixedPrice))
    : '';

  let dis_price = null;
  dis_price = getMoneyString(parseInt(cartData.price.goodsPrice));

  // console.log(cartData[270][4532][0].goodsNm)  // 접근

  // optionText에 둘다 있는 경우 -> 색상 옵션과 사이즈

  // 조건 분기 ->
  // 1) 색상이 있고, 사이즈가 있는 경우
  // 2) 색상이 있고 , 사이즈가 따로 없는 경우
  // 3) 둘다 없는 경우 (기본)

  // 옵션이 하나인 경우 -> 하나만 보여주면 된다.
  // 옵션이 두개인 경우 => / 를 통해 분기하고 보여준다.

  let optionResult = '';
  let nonOption = '옵션이 구매 불가합니다!'

  //optionNm
  if (cartData.option.length) {
    optionResult = `${cartData.option[0].optionValue} 색상 : ${cartData.optionNm}`; //  사이즈에 변수 넣어주기
  } else {
    optionResult = '기본';
  }

  // 상품이 품절인경우
  // cartData.soldOutFL이 Y이거나 soldOut이 있고 그 값이 Y인 경우
  //1) 이미지 변환
  //2) 글꼴 변환

  // 상품이 품절인 경우
  let goods_exist = true;
  let option_exist = true;
  if (cartData.soldOutFl === 'y' || cartData.soldOut === 'y') {
    goods_exist = false; // 상품이 없음 상품이 품절인 경우
    option_exist = true;
  } else if (cartData.optionFl === 'y' && cartData.soldOutFl === 'n') {
    goods_exist = false; // 상품은 있고 옵션만 품절인 경우
    option_exist = false;
    optionResult = '옵션이 구매 불가합니다'
  }

  const select = () => {
    let arr = [];

    for (let i = 0; i < 100; i++) {
      arr.push(<option value={i}>{i}</option>);
    }
    return arr;
  };

  // optionResult가 옵션이 구매 불가합니다.

  const exportItem = () => {
    return (
      <Grid
        container
        key={cartData.goodsNo}
        className="ItemEntry"
        style={{ display: 'flex' }}
      >
        <Grid item lg={12} md={12} xs={12}>
          <hr id="goodsLine" />
        </Grid>

        <Grid item xs={12} className="Contain" style={{ display: 'flex' }}>
          <Grid item>
            <Grid style={{ position: 'absolute' }} item={true}>
              {checkList.map((cd) => cd.sno).includes(cartData.sno) ? (
                <img
                  src="https://1reactphoto.s3.ap-northeast-2.amazonaws.com/imgs/icons/checked.png"
                  alt="checked"
                  className="GreenCheckBox"
                  inputProps={{ name: 'cartSno[]' }}
                  onClick={(e) => handleCheck(cartData.sno, cartData.scmNo)}
                  style={{
                    marginTop: 20,
                    width: 19,
                    height: 19,
                    marginRight: 10,
                  }}
                />
              ) : (
                <img
                  src="https://1reactphoto.s3.ap-northeast-2.amazonaws.com/imgs/icons/unChecked.png"
                  alt="un
                  "
                  className="GreenCheckBox"
                  onClick={(e) => handleCheck(cartData.sno, cartData.scmNo)}
                  style={{
                    marginTop: 20,
                    width: 19,
                    height: 19,
                    marginRight: 10,
                  }}
                />
              )}
            </Grid>

            {goods_exist ? (
              <Grid item={true}>
                <img src={optionImage} alt="상품 이미지" className="goodsImg" />
              </Grid>
            ) : (
              <Grid item xs={2}>
                <img
                  src={optionImage}
                  alt="상품 이미지"
                  className="nonGoodsImg"
                />
                <Grid
                  item
                  className="nonExistGoods"
                  style={{ position: 'relative' }}
                >
                  <Grid className="soldOut" style={{ textAlign: 'center' }}>
                    <Grid className="itemText">SOLD OUT</Grid>
                  </Grid>
                </Grid>
              </Grid>
            )}
          </Grid>

          <Grid item xs={6} className="main" style={{ marginLeft: '17px' }}>
            {!(!goods_exist && option_exist) ? (
              <Grid item>
                <Grid className="goodsNm">
                  <span>{cartData.goodsNm}</span>
                </Grid>
              </Grid>
            ) : (
              <Grid item className="unGoodsNm">
                <Grid item style={{ textAlign: 'left' }}>
                  <div className="unOption">{cartData.goodsNm}</div>
                </Grid>
              </Grid>
            )}

            <Grid
              item
              className="optionBar"
              style={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <Grid item className="optionNm" style={{ display: 'flex' }}>
                {optionResult}
              </Grid>
              <Grid item class="select">
                <select
                  className="selectCnt"
                  value={cartData.price.goodsCnt}
                  onChange={handleChange}
                  style={{ paddingLeft: '35%' }}
                >
                  {select().map((el) => el)}
                </select>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={2} className="deliveryPrice">
            <div className="deliveryPrice">
              {parseInt(cartData.currentDeliveryPrice) === 0 ? (
                <span className="Option">무료배송</span>
              ) : (
                <span className="Option">
                  {getMoneyString(parseInt(cartData.currentDeliveryPrice))}
                </span>
              )}
            </div>
          </Grid>
          <Grid item xs={2} className="goodsPrice">
            {true ? (
              <div className="goodsPrice">
                <span className="Cost"> {itemTotalPrice}</span>
              </div>
            ) : (
              <span className="Cost"> {itemTotalPrice}</span>
            )}
          </Grid>
        </Grid>
      </Grid>
    );
  };

  const mobileItem = () => {
    return (
      <Grid
        container
        key={cartData.goodsNo}
        className="ItemEntry"
        style={{ display: 'flex', justifyContent: 'center', height: '209px' }}
      >
        <Grid item  xs={12}>
          <hr id="goodsLine" />
        </Grid>
        <Grid container style={{ width: '88.9%' }}>
          <Grid container xs={1}>
            <div>
              {checkList.map((cd) => cd.sno).includes(cartData.sno) ? (
                <img
                  src="https://1reactphoto.s3.ap-northeast-2.amazonaws.com/imgs/icons/checked.png"
                  alt="checked"
                  className="GreenCheckBox"
                  inputProps={{ name: 'cartSno[]' }}
                  onClick={(e) => handleCheck(cartData.sno, cartData.scmNo)}
                  style={{ width: 19, height: 19, marginRight: 0 }}
                />
              ) : (
                <img
                  src="https://1reactphoto.s3.ap-northeast-2.amazonaws.com/imgs/icons/unChecked.png"
                  alt="unchecked"
                  className="GreenCheckBox"
                  onClick={(e) => handleCheck(cartData.sno, cartData.scmNo)}
                  style={{ width: 19, height: 19, marginRight: 0 }}
                />
              )}
            </div>
          </Grid>

          <Grid item xs={11}>
            {goods_exist ? (
              <Grid>
                <img
                  src={optionImage}
                  alt="상품 이미지"
                  className="goodsImg"
                  style={{
                    width: '64px',
                    height: '64px',
                    float: 'left',
                    marginLeft: '0',
                    marginRight: '5px',
                  }}
                />
              </Grid>
            ) : (
              <Grid
                className="nonMobileExistGoods"
                styles={{ alignItems: 'center', width: '64px', height: '64px' }}
              >
                <img
                  src={optionImage}
                  alt="상품 이미지"
                  className="nonGoodsImg"
                  style={{
                    width: '64px',
                    height: '64px',
                    float: 'left',
                    marginLeft: '0',
                    marginRight: '5px',
                    marginTop: '0'
                  }}
                />
                <Grid
                  item
                  className="nonExistGoods"
                  style={{ position: 'absolute', border: '0' }}
                >
                  <Grid
                    className="soldOut"
                    style={{
                      textAlign: 'center',
                      margin: 'auto',
                      marginTop: '15px',
                    }}
                  >
                    <Grid className="itemText" style={{ margin: '0' }}>
                      SOLD OUT
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            )}

            {!(!goods_exist && option_exist) ? (
              <Grid
                container
                xs={9}
                style={{ margin: 0, height: 40, padding: 0 }}
              >
                <Grid
                  md={8}
                  xs={8}
                  class="mGoodsNm"
                  style={{
                    fontFamily: 'NotoSansCJKkr',
                    fontSize: '14px',
                    fontWeight: 'normal',
                    fontStyle: 'normal',
                    lineHeight: '1.36',
                    letterSpacing: 'normal',
                    textAlign: 'left',
                    width: '87.3%',
                    height: '40px',
                    marginBottom: '0',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: '2',
                    WebkitBoxOrient: 'vertical',
                    wordWrap: 'break-word',
                    marginLeft: '3.2%',
                  }}
                >
                  {cartData.goodsNm}
                </Grid>
                <Grid className="xBox">
                  {/* X를 누르면 해당 상품만 삭제하는 기능 넣어야 함, unOption일때 글의 길이가 길면 ...으로 바꾸는 것을 적용하고 다시 x 사진과 기능 적용시켜야 함 */}
                  <img
                    onClick={deleteCart}
                    src={xbutton}
                    class="X_small"
                    style={{ marginBottom: '100%' }}
                  />
                </Grid>
              </Grid>
            ) : (
              <Grid container xs={9}>
                <Grid
                  style={{
                    width: '87.3%',
                    fontFamily: 'NotoSansCJKkr',
                    fontSize: '14px',
                    fontWeight: 'normal',
                    fontStyle: 'normal',
                    lineHeight: '1.21',
                    letterSpacing: 'normal',
                    textAlign: 'left',
                    height: '40px',
                    color: 'var(--color-gray-1)',
                    marginBottom: '0',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: '2',
                    WebkitBoxOrient: 'vertical',
                    wordWrap: 'break-word',
                    marginLeft: '3.4%',
                  }}
                >
                  {cartData.goodsNm}
                </Grid>
                <Grid className="xBox">
                  <img
                    onClick={deleteCart}
                    src={xbutton}
                    class="X_small"
                    style={{ marginBottom: '100%' }}
                  />
                </Grid>
              </Grid>
            )}

            <Grid
              className="eachPrice"
              style={{ display: 'flex', alignItems: 'center' }}
            >
              {true ? (
                <span
                  style={{
                    marginLeft: '3.1%',
                    width: '100%',
                    textAlign: 'left',
                    fontSize: '16px',
                    fontWeight: 'bold'
                  }}
                >
                  {dis_price}
                </span>
              ) : (
                <span
                  style={{
                    marginLeft: '3.1%',
                    width: '100%',
                    textAlign: 'left',
                    fontSize: '16px',
                    fontWeight: 'bold'
                  }}
                >
                  {dis_price}
                </span>
              )}
            </Grid>

            <Grid
              container
              xs={12}
              className="optionBar"
              style={{ margin: '0', marginTop: '11px', height: '40px' }}
            >
              {(cartData.optionFl === 'y' && cartData.soldOutFl === 'n') ? (
                <Grid item className="optionNm" style={{paddingTop:'11px', fontWeight:'bold'}}>
                  {nonOption}
                </Grid>
              ) : (
                <Grid item className="optionNm" style={{ paddingTop: '11px'}}>
                {optionResult}
                </Grid>
              )}
              <Grid item class="select">
                <select
                  className="selectCnt"
                  style={{ paddingLeft: '30%', marginTop: '4px' }}
                  value={cartData.price.goodsCnt}
                  onChange={handleChange}
                >
                  {select().map((el) => el)}
                </select>
              </Grid>
            </Grid>

            {/* <hr className="priceHr"/> */}

            <Grid xs={12} style={{ marginTop: '12px' }}>
              {parseInt(cartData.currentDeliveryPrice) === 0 ? (
                <Grid
                  className="Option itemPrice"
                  style={{
                    float: 'left',
                    width: '50%',
                    textAlign: 'left',
                    paddingLeft: '2.4%',
                  }}
                >
                  무료배송
                </Grid>
              ) : (
                <Grid
                  className="Option itemPrice"
                  style={{
                    float: 'left',
                    width: '50%',
                    textAlign: 'left',
                    paddingLeft: '2.4%',
                  }}
                >
                  {`배송비 `+ getMoneyString(parseInt(cartData.currentDeliveryPrice))+` 포함`}
                </Grid>
              )}
              <Grid
                className="Cost"
                style={{
                  float: 'right',
                  width: '50%',
                  textAlign: 'right',
                  paddingRight: '4.1%',
                  fontSize: '18px'
                }}
              >
                {`총 `+getMoneyString(mobilePrice + (parseInt(cartData.currentDeliveryPrice)))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  };

  return mobile ? mobileItem() : exportItem();
};

const mapStateToProps = ({ CartReducer }) => {
  return {
    CartReducer,
  };
};

// const mapDispatchToProps = (dispatch) => ({
//     changeCntCart: (sno,changeCount,scmNo,deliverySno) => dispatch(action.changeCntCart(sno,changeCount,scmNo,deliverySno))
// })

export default withRouter(
  connect(mapStateToProps, { changeCount, deleteSingleCart })(ItemEntry)
);
