import React from 'react';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import './BannerItem.css';

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function salesPercentage(goodsPrice, fixedPrice) {
  let percentage = Math.trunc((1 - goodsPrice / fixedPrice) * 100);
  if (percentage >= 100 && percentage < 0) {
    return -1;
  }
  return percentage;
}


const BannerItem = (props) => {
  const mobile = useMediaQuery('(max-width:767px)');
  const { goodsPrice, imageSrc, fixedPrice} = props;
    return (
      <Grid className="BrecBox" xl={3} md={4} xs={4}>
        <Grid className="BimgBox">
          <img className="BgoodsImg"src={imageSrc} />
            {((salesPercentage(goodsPrice, fixedPrice) === -1) || (salesPercentage(goodsPrice, fixedPrice) === 0)) ? null : (
              <Grid className="Bsales_Percentage">
                {salesPercentage(goodsPrice, fixedPrice)}%
              </Grid>
            )}
        </Grid>
        <Grid className="BpriceBox">
          {((salesPercentage(goodsPrice, fixedPrice) === -1) || (salesPercentage(goodsPrice, fixedPrice) === 0)) ? (
            <Grid className="Bgoods_Price only">
              {numberWithCommas(goodsPrice)+'원'}
            </Grid>
          ) : 
            (mobile ? 
              <Grid>
                <Grid className="Boriginal_Price mobileLine">
                  {numberWithCommas(fixedPrice)+'원'}
                </Grid>
                <Grid className="Bgoods_Price">
                  {numberWithCommas(goodsPrice)+'원'}
                </Grid>
              </Grid>
             : 
              <Grid>
                <Grid className="Bgoods_Price">
                  {numberWithCommas(goodsPrice)+'원'}
                </Grid>
                <Grid className="Boriginal_Price">
                {numberWithCommas(fixedPrice)+'원'}
                </Grid>
              </Grid>)
            }
        </Grid>
      </Grid>
    );
};
export default BannerItem;
