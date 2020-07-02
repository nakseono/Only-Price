import React ,{ Fragment, Component } from 'react';
import { createMuiTheme , ThemeProvider } from '@material-ui/core/styles';
import ItemList from './ItemList';
import { connect }from 'react-redux';
import { deleteCartList, deleteSingleCart } from '../crunch_cart/action';
import { getFilteredCarts, getFlattnedCart, saveCart, } from '../utils/datautils';
import { getMoneyString } from '../utils/stringutils';
import { Grid } from '@material-ui/core';
import TotalPrice from './TotalPrice'
import Recommend from './Recommend'
import Container from '@material-ui/core/Container';
import './index.css';
import './Style/newCart_PC.css';
import './Style/newCart_tablet.css';
import './Style/newCart_mobile.css';

const theme = () => ({
	typography: {
	  fontFamily : [
			'NotoSansCJKkr'
		].join('')
	}
})

class NewCart extends Component{

	state = {
		checkList: [],
		showModal: false,
		eachShowModal: false,
		matches: window.matchMedia("(min-width: 768px)").matches
	}

	componentDidMount = () => {
		const { CartReducer, MainReducer } = this.props;
		let cartData = CartReducer.cartData;

		// 카트에서 선별된 데이터 리스트를 담아준다. 
		let filteredCartList = getFilteredCarts(cartData);

		// 체크 리스트를 가져오고 그 상태를 넣어준다. 
		const checkList = filteredCartList.map((cd) => {
			return { sno: cd.sno, scmNo: cd.scmNo }
		})
		this.setState({ checkList: [...checkList] });
		
		const handler = e => this.setState({matches: e.matches});
    window.matchMedia("(min-width: 768px)").addListener(handler);
	}
	
	// 체크 한 리스트가 없는 경우 
	emptyCheckList = () => {
		this.setState({ checkList: [] });
	}
	
	
	// 선택 아이템 삭제 // 상태를 디스패치 해주어야 한다. 
	deleteCheckedCart = (e) => {
		const checkList = this.state.checkList;
		let filteredCartList = getFilteredCarts(this.props.CartReducer.cartData);
		let filteredCheckedCart = filteredCartList.filter(cd => (checkList.map(cl => cl.sno).includes(cd.sno)));
		this.props.deleteCartList(filteredCheckedCart);
		this.setState({
				checkList: this.state.checkList.filter((ch) =>
						checkList.includes(ch) === false
				)
		})
		this.setState({ showModal: !this.state.showModal })
	}
	
	// 카트 하나 하나 삭제
	eachDeleteCart = (checkList) => {
		this.props.deleteCartList(checkList);
		this.setState({ checkList: this.state.checkList.filter((ch) => !checkList.includes(ch)) })
		this.setState({ eachShowModal: !this.state.eachShowModal })
	}
	
	// 전체 상품 선택 
	handleAllCheck = () => {
		const { CartReducer } = this.props;
		let cartData = CartReducer.cartData;
		let filteredCartList = getFilteredCarts(cartData);
		this.state.checkList.length === filteredCartList.length ?
			this.setState({ checkList: [] })
			: this.setState({
					checkList: [
							...filteredCartList.map((cd) => ({ sno: cd.sno, scmNo: cd.scmNo }))]
			})
	}
	
	// 하나 상품 선택
	handleCheck = (sno, scmNo) => {
		console.log('jjjjj')
		const checkList = this.state.checkList;
		checkList.map(cd => cd.sno).includes(sno)
			? this.setState({ checkList: checkList.filter((c) => c.sno !== sno) })
			: this.setState({ checkList: [...checkList, { sno: sno, scmNo: scmNo }] })
			console.log('hi');
	}
	
	
	handleScmCheck = (scmNo) => {
		const { CartReducer } = this.props;
		const checkList = this.state.checkList;
		let cartData = CartReducer.cartData;
		let filteredCartList = getFilteredCarts(cartData).filter(cd => cd.scmNo === scmNo);
		const filteredCheckList = checkList.filter(cd => cd.scmNo === scmNo);
		const notCheckList = checkList.filter(cd => cd.scmNo !== scmNo);

		
	
		filteredCheckList.length === filteredCartList.length ?
				this.setState({ checkList: [...notCheckList] })
				: this.setState({
						checkList: [
								...notCheckList,
								...filteredCartList.map((cd) => ({ sno: cd.sno, scmNo: cd.scmNo }))
						]
				})
	}

	makeTotalPrice = (priceKey) => {
    const scmData = this.props.CartReducer.scmInfo;
    let totalPrice =
      Object.keys(scmData).length > 0
        ? Object.keys(scmData).reduce(
            (acc, scmKey) => acc + parseInt(scmData[scmKey][priceKey]),
            0
          )
        : 0;
    return totalPrice;
	};
	
	makeTotalGoodsPrice = (filteredCarts) => {
    const totalPrice = filteredCarts.reduce(
      (acc, cd) => acc + parseInt(cd.price.goodsPriceSum),
      0
    );
    return totalPrice;
  };

  makeTotalDeliveryPrice = (filteredCarts) => {
    const totalPrice = filteredCarts.reduce(
      (acc, cd) => acc + parseInt(cd.currentDeliveryPrice),
      0
    );
    return totalPrice;
  };

	
	render = () => {
		const { checkList, showModal, eachShowModal } = this.state;
		const { CartReducer ,MainReducer } = this.props;
		const filteredCart = getFilteredCarts(CartReducer.cartData);
		let list_exist = false;
			if (filteredCart.length !== 0) {
				list_exist = true;
			}
		
		const totalOriginalGoodsPrice = this.makeTotalPrice('goodsOriginalPrice');
		const totalPrice = this.makeTotalGoodsPrice(filteredCart);
		let totalDiscountPrice = totalOriginalGoodsPrice - totalPrice;
		let totalDeliveryPrice = this.makeTotalDeliveryPrice(filteredCart);
		let totalFinalPrice = totalPrice + totalDeliveryPrice;
		
		let totalObjectList = [
			{ title: "상품금액", sumText: getMoneyString(totalPrice), additional: "", rightSign: "m" },
			{ title: "상품할인금액", sumText: getMoneyString(totalDiscountPrice), additional: "", rightSign: "p" },
			{ title: "배송비", sumText: getMoneyString(totalDeliveryPrice), additional: "", rightSign: "e" },
			{ title: "결제예정금액", sumText: getMoneyString(totalFinalPrice), additional: "", rightSign: "" },
		];
		
		// 아이템 리스트 존재 하지 않을 경우 

		const nonItemList = (n) => {
			return (
				<Grid className ="nonContainer" container xs={n} >
				  <Grid className="nonItemListHeader">장바구니</Grid>

					<Grid item lg={12} md={12}>
						<hr id="HrTag"/>
					</Grid>

					<Container>
						<Grid className="nonItemListCenter">장바구니에 담긴 상품이 없습니다.</Grid>
					</Container>
				</Grid>
			)
		}

		// 모바일 장바구니가 없을 경우 
		const nonItemListMobileRender = () => {
			return (
				<Grid container xs={12}>
					<Grid className="nonItemMobileList">
					  <Container className="nonItemMobileText">
							장바구니에 담긴 상품이 없습니다.
						</Container>
					</Grid>
				</Grid>
			)
		}

		const itemListTabletRender = (n) => {

			if(list_exist){
				return (
					<Grid container xs ={n} style={{display:'flex'}}>
						<Grid item className="ListContainer" xs={12}>
							<ItemList
								checkList={checkList}
								handleCheck={this.handleCheck}
								emptyCheckList={this.emptyCheckList}
								handleAllCheck={this.handleAllCheck}
								deleteCart={this.deleteCheckedCart}
								eachDeleteCart={this.eachDeleteCart}
								changeAddGoodsCount={this.changeAddGoodsCount}
								handleScmCheck={this.handleScmCheck}
								filteredCart={filteredCart}
							/>
					</Grid>
						<TotalPrice className="totalContainer"
							data={totalObjectList}
							saveCart={this.saveCart}
							goToOrder={(e)=>this.goToOrder(e,totalPrice,totalDeliveryPrice)}
							filteredCart={filteredCart}
						/>
					</Grid>
				)
			}else{
				return nonItemListMobileRender();
			}
		}

		// 윈도우 화면 
		const itemListRender = (n) => {
				return (
					<Grid container className="ListContainer" xs={n} style={{display:'flex'}}>
						<Grid item xs={9}>
							<ItemList
								checkList={checkList}
								handleCheck={this.handleCheck}
								emptyCheckList={this.emptyCheckList}
								handleAllCheck={this.handleAllCheck}
								deleteCart={this.deleteCheckedCart}
								eachDeleteCart={this.eachDeleteCart}
								changeAddGoodsCount={this.changeAddGoodsCount}
								handleScmCheck={this.handleScmCheck}
								filteredCart={filteredCart}
								data={totalObjectList}
							/>
					</Grid>
            <Grid item className="totalContainer" xs={3}>
							<TotalPrice 
								data={totalObjectList}
								saveCart={this.saveCart}
								goToOrder={(e)=>this.goToOrder(e,totalPrice,totalDeliveryPrice)}
								filteredCart={filteredCart}
							/>
						</Grid>
					</Grid>
				)
		}


				
		return (
		  <Container className="CartPC" style={{padding:'0'}}>
				<Grid container className="CartContentsSetPC">
					<Grid xs={12} className="ItemListPC">
						{this.state.matches ? (  //  768 min-width -> 최소 윈도우 
							list_exist ? (
								itemListRender(12) // 윈도우 화면 // 테블릿 화면 겹칩 현상 
							) : (
								nonItemList(12) // 리스트가 없는 경우 
							)
							) : (
								itemListTabletRender(12) //  테블릿 모바일 
							)}
							<Recommend />
					</Grid>
				</Grid>
			</Container>
		);
	}
}

const mapStateToProps = ({ CartReducer, MainReducer }) => {
	return {
			CartReducer,
			MainReducer
	}
}

export default connect(mapStateToProps,{ deleteCartList , deleteSingleCart})(NewCart) ;
