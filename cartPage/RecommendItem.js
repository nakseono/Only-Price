import React from 'react';
import './RecommendItem.css';
import Grid from '@material-ui/core/Grid';
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
function originalPrice(goodsPrice, salesPercentage) {
  return Math.trunc(goodsPrice * (100 / (100 - salesPercentage)));
}
const imgSizeObj = {
  pc: {
    width: 282,
    height: 282,
    borderRadius: 8,
    border: 'solid 1px #f2f2f2',
  },
  tablet: {
    width: 170,
    height: 170,
    borderRadius: 8,
    border: 'solid 1px #f2f2f2',
  },
  mobile: {
    width: 152,
    height: 152,
    borderRadius: 8,
    border: 'solid 1px #f2f2f2',
  },
};
const RecommendItem = (props) => {
  const { goodsPrice, imageSrc, salesPercentage, imgKey } = props;
  if (imgKey === 'pc') {
    return (
      <Grid style={{ marginBottom: '0.6%' }}>
        <Grid style={{ position: 'relative' }}>
          <img src={imageSrc} style={imgSizeObj[imgKey]} />
          {salesPercentage === 0 ? null : (<Grid className="sales_Percentage">{salesPercentage}%</Grid>)}
        </Grid>
        <Grid style={{ marginBottom: '32%' }}>
          <Grid style={{}}>
            <Grid className="goods_Price">
              {numberWithCommas(goodsPrice)+`원`}
            </Grid>
            {salesPercentage === 0 ? null : (
            <Grid className="original_Price">
              {numberWithCommas(originalPrice(goodsPrice, salesPercentage))+`원`}
            </Grid>)}
          </Grid>
        </Grid>
      </Grid>
    );
  } else if (imgKey === 'tablet') {
    return (
      <Grid style={{ marginBottom: '3.1%' }}>
        <Grid style={{ position: 'relative' }}>
          <img src={imageSrc} style={imgSizeObj[imgKey]} />
          {salesPercentage === 0 ? null : (<Grid className="sales_Percentage_T">{salesPercentage}%</Grid>)}
        </Grid>
        <Grid style={{ marginBottom: '32%' }}>
            {salesPercentage === 0 ? (
              <Grid className="goods_Price_T" style={{marginTop:'3.4%', marginBottom:'10.4%'}}>
                {numberWithCommas(goodsPrice)+`원`}
              </Grid>
            ) : (
              <Grid>
                <Grid className="original_Price_T">
                  {numberWithCommas(originalPrice(goodsPrice, salesPercentage))+`원`}
                </Grid>
                <Grid className="goods_Price_T">
                  {numberWithCommas(goodsPrice)+`원`}
                </Grid>
              </Grid>
            )}
        </Grid>
      </Grid>
    );
  } else {
    return (
      <Grid style={{ marginBottom: '2.5%' }}>
        <Grid style={{ position: 'relative' }}>
          <img src={imageSrc} style={imgSizeObj[imgKey]} />
          {salesPercentage === 0 ? null : (<Grid className="sales_Percentage_M">{salesPercentage}%</Grid>)}
        </Grid>
        <Grid style={{}}>
          <Grid style={{}}>
            {salesPercentage === 0 ? (
              <Grid className="goods_Price_M" style={{marginTop:'1%', marginBottom:'12.2%'}}>
                {numberWithCommas(goodsPrice)+`원`}
              </Grid>
            ) : (
              <Grid>
                <Grid className="original_Price_M">
                  {numberWithCommas(originalPrice(goodsPrice, salesPercentage))+`원`}
                </Grid>
                <Grid className="goods_Price_M">
                  {numberWithCommas(goodsPrice)+`원`}
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    );
  }
};
export default RecommendItem;