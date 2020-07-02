// 액션 
export const COUNT_CHANGE = "COUNT_CHANGE"

export const changeCnt = (sno,changeCount,scmNo,deliverySno,) => ({
	type:COUNT_CHANGE,
	sno:sno,
	changeCount,
	scmNo,
	deliverySno,
});


export const changeCntCart = (sno,changeCount,scmNo,deliverySno) => (dispatch,getState) => {
	const goodsCnt = getState().CartReducer.cartData;
	console.log(changeCount);
	dispatch(changeCnt(sno,changeCount,scmNo,deliverySno));
}