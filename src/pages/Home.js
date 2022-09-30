import styled from "styled-components";
import Body from "../components/Body";
import Header from "../components/header/Header";
import PageTitle from "../components/PageTitle";
import SearchBar from "../components/search/SearchBar";
import routes from "../routes";
import LogoStyle from "../styles/LogoStyle";
import PageBannerSlider from "../components/home/PageBannerSlider";
import Category from "../components/home/Category";
import RecommendBookSlider from "../components/home/RecommendBookSlider";
import Footer from "../components/Footer";

function Home() {
  return (
    <Body>
      <PageTitle title="Home" />
      <MainPage>
        <Header />
        <SearchBarBox>
          <Logo>econoBeep</Logo>
          <SearchBar searchApiUrl={routes.searchAll} placeholder="검색" />
        </SearchBarBox>
        <PageBannerSlider />
      </MainPage>

      <ExpendPage>
        <Content>
          <ContentTitle>카테고리</ContentTitle>
          <Category />
        </Content>
        <Content>
          <ContentTitle>추천 도서</ContentTitle>
          <RecommendBookSlider />
        </Content>
        <Footer />
      </ExpendPage>
    </Body>
  );
}

const MainPage = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SearchBarBox = styled.div`
  position: absolute;
  top: 40%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 767px) {
    left: 10vw;
    width: 80vw;
  }

  @media screen and (min-width: 768px) {
    left: 20vw;
    width: 60vw;
  }
`;

const Logo = styled(LogoStyle)`
  text-align: center;
  font-size: 48px;
  margin-bottom: 5px;
`;

const ExpendPage = styled(MainPage)`
  min-height: 100vh;
`;

const Content = styled.div`
  width: 100%;
  max-width: 750px;
  margin-top: 60px;
  padding: 0 30px;
  display: flex;
  flex-direction: column;
`;

const ContentTitle = styled.div`
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: 500;
  color: ${(props) => props.theme.black};
`;

export default Home;
