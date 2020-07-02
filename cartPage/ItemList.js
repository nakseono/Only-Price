
import React , { Fragment, useState, Component }from 'react';
import { connect } from 'react-redux'
import ItemEntry from './ItemEntry';
import * as cartAction from '../crunch_cart/action';
import { deleteCartList, deleteSingleCart } from '../crunch_cart/action';
import { getFilteredCarts, getFlattnedCart, saveCart, } from '../utils/datautils';
import { getMoneyString } from '../utils/stringutils';
import {
	Grid,
	Checkbox,
	Button,
	Typography,
	createMuiTheme,
	MuiThemeProvider,
	useMediaQuery
} from '@material-ui/core';

import del from './img/delete.svg';

const theme = createMuiTheme({
	typography: {
	  fontFamily: 'NotoSansCJKkr, sans-serif'
	},
	breakpoints: {
	  values: {
		xs: 360,
		// sm: 450,
		md: 768, // 태블릿
		lg: 1200, // 데스크탑
		// xl: 1920
	  },
	},
  });
  


const ItemList = (props) => {
	const mobileScreen = useMediaQuery("(max-width:767px)");
	const tabletScreen = useMediaQuery("(max-width:1199px)");

	const { optionGoodsUnitprice1,
		CartReducer, checkList, handleCheck, deleteCart, eachDeleteCart,
		handleAllCheck, emptyCheckList, changeAddGoodsCount,
		handleScmCheck, filteredCart , data
  } = props;

// 스토어에 있는 카트 전체 데이터 
const wholeCartData = CartReducer.cartData;

const scmInfo = CartReducer.scmInfo;

// 장바구니 리스트가 존재하지 않는 경우 
let list_exist = false;
if (filteredCart.length !== 0) {
		list_exist = true;
}

const noCartText = (n) => {
	return (
		<Typography className="NoCart" item={true} style={{marginTop: n, align:'center'}}>
			장바구니에 담긴 상품이<br></br>없습니다.
		</Typography>
	)}

	return(
		<MuiThemeProvider theme={theme}>

		<Grid container className="mainTable">
			<form id="frmCart" target="ifrmProcess" action="../goods/naver_pay.php" className="CartForm">
		    <input name="mode" type="hidden" />
					<input type="hidden" name="cart[cartSno]" value="" />
					<input type="hidden" name="cart[goodsNo]" value="" />
					<input type="hidden" name="cart[goodsCnt]" value="" />
					<input type="hidden" name="cart[addGoodsNo]" value="" />
					<input type="hidden" name="cart[addGoodsCnt]" value="" />
					<input name="useBundleGoods" type="hidden" value={(filteredCart.length) ? filteredCart[0].useBundleGoods : "0"} />

	
					{mobileScreen ? null : (
            	<div>
            	  <Grid item className="cartName" style={{
										margin: 24,
            	    }}>
									장바구니
								</Grid>
								<Grid item lg={12} md={12}>
									<hr id="HrTag"/>
								</Grid>
							</div>
          )}

					{list_exist ? (
            mobileScreen ? (
							<Grid container className="ItemHeader" style={{ width: '88.9%', margin:'auto', padding: '1px', height: '40px', alignItems: 'center' }} >
                <Grid xs={12} style={{ display: 'flex', alignItems: 'center' }}>
                  <Grid container xs={1}>
                    {checkList.length === filteredCart.length ? (
                      <img
                        src="https://1reactphoto.s3.ap-northeast-2.amazonaws.com/imgs/icons/checked.png"
                        alt="checked"
                        className="GreenCheckBox"
                        onClick={(e) => handleAllCheck()}
                      />
                    ) : (
                      <img
                        src="https://1reactphoto.s3.ap-northeast-2.amazonaws.com/imgs/icons/unChecked.png"
                        alt="unchecked"
                        className="GreenCheckBox"
                        onClick={(e) => handleAllCheck()}
                      />
                    )}
                  </Grid>
                  <Grid xs={11} className="nameBar">
                    <Grid className="textArea">
                      <div className="Text">
                        전체상품 (총{' '}
                        <span className="Text">{checkList.length}</span> 개)
                      </div>
                    </Grid>
                    <Grid className="trashBox">
                      <Button
                        className="TrashBtn"
                        onClick={deleteCart}
                        style={{ marginBottom: '4px' }}
                      >
                        <img
                          className="RightImg"
                          src={del}
                          style={{ width: 24, height: 24 }}
                        ></img>
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
						):(
							tabletScreen ? (
								/* 테블릿  */
							<Grid container xs={12} className="ItemHeader">
								<Grid xs={4} className="Text" item={true} style={{display:'flex'}}>
								{checkList.length === filteredCart.length ?
										<img src="https://1reactphoto.s3.ap-northeast-2.amazonaws.com/imgs/icons/checked.png" alt="checked" className="GreenCheckBox" onClick={(e) => handleAllCheck()} />
										:
										<img src="https://1reactphoto.s3.ap-northeast-2.amazonaws.com/imgs/icons/unChecked.png" alt="unchecked" className="GreenCheckBox" onClick={(e) => handleAllCheck()} />
								}
									<Grid className ="allCart" item={true} >
										<div className="allCart">
										전체상품 (총 {checkList.length}개)
										</div>
									</Grid>
								</Grid>

								<Grid xs={3} className="center">
								</Grid>
								<Grid xs={1} >
									<Button className="TrashBtn" onClick={deleteCart} >
											<img className="RightImg" src={del} style={{width:24,height:24}} ></img>
									</Button>
								</Grid>

								<Grid xs={2} className="middle" >
									<Grid className="delNm" style={{marginBottom:'10px'}}>
										배송비
									</Grid>
								</Grid>
								<Grid xs={2} className="last">
									<div className="last">
										결제 금액
									</div>
								</Grid>
						</Grid>
							):(
								/* 윈도우 화면 */
							<Grid container xs={12} className="ItemHeader">
								<Grid xs={4} className="Text" item={true} style={{display:'flex'}}>
								{checkList.length === filteredCart.length ?
										<img src="https://1reactphoto.s3.ap-northeast-2.amazonaws.com/imgs/icons/checked.png" alt="checked"  className="GreenCheckBox" onClick={(e) => handleAllCheck()} />
										:
										<img src="https://1reactphoto.s3.ap-northeast-2.amazonaws.com/imgs/icons/unChecked.png" alt="unchecked"  className="GreenCheckBox" onClick={(e) => handleAllCheck()} />
								}
									<Grid className ="allCart" item={true} >
										<div className="allCart" >
										전체상품 (총 {checkList.length}개)
										</div>
									</Grid>
								</Grid>

								<Grid xs={3} className="center">
								</Grid>
								<Grid xs={1} >
									<Button className="TrashBtn" onClick={deleteCart} >
											<img className="RightImg" className="TrashBtn" src={del} style={{width:24,height:24}} ></img>
									</Button>
								</Grid>

								<Grid xs={2} className="middle" >
									<Grid className="delNm">
										배송비
									</Grid>
								</Grid>
								<Grid xs={2} className="last">
									<div className="last">
										결제 금액
									</div>
								</Grid>
						</Grid>
							)))
							:null}
					
					{list_exist ?
							Object.keys(wholeCartData).filter(scmNo => {
									let matchedScm = filteredCart.filter(fc => (fc.scmNo === scmNo));
									return matchedScm.length > 0;
							}).map((scmNo) => {
									return (
											<Fragment key={scmNo}>
													{Object.keys(wholeCartData[scmNo]).map((deliveryNo) => {
															let cartDataList = wholeCartData[scmNo][deliveryNo];
															let filteredCart = cartDataList.filter((cd) => !cd.cartDeleted);
															return filteredCart.map((cartData) => (
																	<ItemEntry cartData={cartData}
																			checkList={checkList}
																			handleCheck={handleCheck}
																			emptyCheckList={emptyCheckList}
																			handleAllCheck={handleAllCheck}
																			handleScmCheck={handleScmCheck}
																			eachDeleteCart={eachDeleteCart}
																			changeAddGoodsCount={changeAddGoodsCount}
																			key={cartData.sno}
																			scmDeliveryTotal={scmInfo[scmNo].scmDeliveryTotal}
																			data={data}
																	/>
															))
													})}
											</Fragment>
									)
							})
							: (noCartText(120))
					}
          <Grid item lg={12} md={12}>
            <hr id="HrTag"/>
          </Grid>
        </form>
      </Grid>
    </MuiThemeProvider>
  );
};

const mapStateToProps = ({ CartReducer, MainReducer }) => {
	return {
			CartReducer,
			MainReducer
	}
}

export default connect(mapStateToProps, { deleteCartList, deleteSingleCart })(ItemList);