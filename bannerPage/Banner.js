import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import axios from 'axios';
import {
  Grid,
  Container,
  useMediaQuery,
  MuiThemeProvider,
  createMuiTheme,
} from '@material-ui/core';
import BannerItem from './BannerItem';
import './Banner.css';

axios.defaults.withCredentials = true;

const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 360,
      md: 1199,
      xl: 1200,
    },
  },
});

const movieBanner = () => {
  const [items, setItems] = useState([]);
  const [imageUrl, setImage] = useState();
  const [MimageUrl, setMImage] = useState();
  const [contents, setContents] = useState({}); //  useState 내부 값은 변동이 될수 있습니다.
  const mobile = useMediaQuery('(max-width:767px)');
  const tablet = useMediaQuery('(max-width:1199px)');
  const screenkey = mobile ? '100%' : tablet ? '78%' : '995px'

  let id = 12;

  // 영상 가져오는 함수
  useEffect(() => {
    axios
      .get(URL) //  bots뒤의 id 값은 변경 될수 있습니다. id값이 어떤식으로 변경 되는지 몰라 12로 기준을 잡고 해결 했습니다. 
      .then((res) => {
          setContents(res.data);
          setImage(res.data.image_url_4);
          setMImage(res.data.image_url_2);
          axios
          .post(`URL`, {userVisitedGoodsNoList: res.data.goods_list.split(', ')})
          .then((res)=>{
            console.log(res.data.goods_list)
            res.data && res.data.length ? setItems(res.data) : setItems([]);
          })
      }).then();
  }, []);

  axios.defaults.withCredentials = true;

  // 영상 배너 백그라운드
  let backgroundColor = `#${contents.hex_code_2}`;

  // 비디오 렌더
  const videoRender = () => {
    return (
      <Grid>
        <Grid xs={12} className="movie">
          <div className="player-wrapper">
            <ReactPlayer
              className="react-player"
              url={contents.video_url}
              width={screenkey}
              height="100%"
            />
          </div>
        </Grid>
      </Grid>
    );
  };

  // 이미지 렌더
  const imageRender = () => {
    return(
    <Grid className="contentContainer">
      <img className="image" src={mobile ? (MimageUrl) : (imageUrl) }/>
    </Grid>)
  }

  
  return (
    <MuiThemeProvider theme={theme}>

      <Grid className="movieContainer" style={{ backgroundColor: `${backgroundColor}` }} >
        {contents.video_url ? videoRender() : imageRender() }
      </Grid>

      <Container xs={12}>
        <Grid maxWidth="xl" className="itemContainer" xs={12}>
          <Grid container className="bannerRec" >
            <Grid container className="recBox">
              {items.map((el) => (
                <BannerItem
                  key={el.goodsNo.toString()}
                  goodsPrice={el.goodsPrice}
                  imageSrc={el.imageSrc}
                  fixedPrice={el.fixedPrice}
                />
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </MuiThemeProvider>
  );
};
export default movieBanner;
