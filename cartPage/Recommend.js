import React, { useEffect, useState } from 'react';
import './Recommend.css';
import axios from 'axios';
import RecommendItem from './RecommendItem';

import Grid from '@material-ui/core/Grid';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';

let userData = { user: 9366 };

const theme = createMuiTheme({
  breakpoints: {
    // Define custom breakpoint values.
    // These will apply to Material-UI components that use responsive
    // breakpoints, such as `Grid` and `Hidden`. You can also use the
    // theme breakpoint functions `up`, `down`, and `between` to create
    // media queries for these breakpoints
    values: {
      xs: 360,
      md: 728,
      xl: 1200,
    },
  },
});

const Recommend = () => {
  const matches_T = useMediaQuery('(min-width:361px)');
  const matches_W = useMediaQuery('(min-width:850px)');
  const imgKey = matches_W ? 'pc' : matches_T ? 'tablet' : 'mobile';

  let data;

  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .post(`URL`, userData)
      .then((res) => {
        console.log(res.data);
        res.data && res.data.length ? setItems(res.data) : setItems([]);
      });
  }, []);

  if (items.length > 0 && imgKey === 'pc') {
    return (
      <MuiThemeProvider theme={theme}>
        <Grid
          maxWidth="xl"
          className="itemContainer"
          style={{ padding: 0 }}
        >
          <Grid container className="recommend-container" style={{ padding: 0, marginTop: '14.67%' }}>
            <Grid className="recommend_Title">추천상품</Grid>
            <Grid item lg={12} md={12}>
              <hr id="HrTag" />
            </Grid>
            <Grid
              container
              style={{ marginTop: '4%', justifyContent: 'space-between' }}
            >
              {items.map((el) => (
                <RecommendItem
                  key={el.goodsNo.toString()}
                  goodsPrice={el.goodsPrice}
                  imageSrc={el.imageSrc}
                  salesPercentage={el.salesPercentage}
                  imgKey={imgKey}
                />
              ))}
            </Grid>
          </Grid>
        </Grid>
      </MuiThemeProvider>
    );
  } else if (items.length > 0 && imgKey === 'tablet') {
    return (
      <MuiThemeProvider theme={theme}>
        <Grid
          maxWidth="xl"
          className="itemContainer"
          style={{ padding: 0 }}
        >
          <Grid container style={{ padding: 0, marginTop: '10.5%' }}>
            <Grid className="recommend_Title_T">추천상품</Grid>
            <Grid item xs={12} lg={12} md={12}>
              <hr id="HrTag" />
            </Grid>
            <Grid
              container
              style={{ marginTop: '4%', justifyContent: 'space-evenly' }}
            >
              {items.map((el) => (
                <RecommendItem
                  key={el.goodsNo.toString()}
                  goodsPrice={el.goodsPrice}
                  imageSrc={el.imageSrc}
                  salesPercentage={el.salesPercentage}
                  imgKey={imgKey}
                />
              ))}
            </Grid>
          </Grid>
        </Grid>
      </MuiThemeProvider>
    );
  } else if (items.length > 0 && imgKey === 'mobile') {
    return (
      <MuiThemeProvider theme={theme}>
        <Grid
          maxWidth="xs"
          className="itemContainer"
          style={{ padding: 0 }}
        >
          <Grid container>
            <Grid style={{ position: 'relative', marginTop: '17.5%' }}>
              <Grid className="recommend_Title_M">추천상품</Grid>
            </Grid>
            <Grid
              container
              style={{ marginTop: '5.6%', justifyContent: 'space-evenly' }}
            >
              {items.map((el) => (
                <RecommendItem
                  key={el.goodsNo.toString()}
                  goodsPrice={el.goodsPrice}
                  imageSrc={el.imageSrc}
                  salesPercentage={el.salesPercentage}
                  imgKey={imgKey}
                />
              ))}
            </Grid>
          </Grid>
        </Grid>
      </MuiThemeProvider>
    );
  } else {
    return <Grid></Grid>
  }
};

export default Recommend;
