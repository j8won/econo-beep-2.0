import styled from "styled-components";
import ReactLoading from "react-loading";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

import useThrottle from "../../hooks/useThrottle";
import SearchBar from "@/components/common/SearchBar";
import RenteeInfo from "@/components/common/RenteeInfo";
import Body from "@/styles/Body";
import theme from "@/styles/Theme";
import PageTitle from "@/components/common/PageTitle";
import InfoListHeader from "@/components/header/InfoListHeader";
import SEARCH_TYPES from "@/constant/SEARCH_TYPES";

function InfoListLayout({ listType, searchApiUrl, loadRenteeList }) {
  const target = useRef(null);
  const [searchParams, _] = useSearchParams();

  const [pageIndex, setPageIndex] = useState(0);
  const pageSize = 8;
  const [lastPage, setLastPage] = useState(false);

  const [rentees, setRentees] = useState([]);

  const getRenteeInfo = async () => {
    const loadedRentees = await loadRenteeList({
      keyword: searchParams.get("keyword"),
      pageIndex: pageIndex,
      pageSize: pageSize,
    });

    if (loadedRentees.length !== 0) {
      setRentees((rentees) => [...rentees, ...loadedRentees]);
      setPageIndex((pageIndex) => pageIndex + 1);
    } else {
      setLastPage(true);
    }
  };

  const throttledGetRenteeInfo = useThrottle(getRenteeInfo(), 500);

  const onIntersect = async ([entry], observer) => {
    if (entry.isIntersecting) {
      observer.unobserve(entry.target);
      await throttledGetRenteeInfo();
      observer.observe(entry.target);
    }
  };

  useEffect(() => {
    let observer;

    if (target) {
      observer = new IntersectionObserver(onIntersect, {
        threshold: 0.5,
      });
      observer.observe(target.current);
    }
    return () => observer && observer.disconnect();
  }, [target, pageIndex, loadRenteeList, searchParams]);

  return (
    <Body>
      <PageTitle
        title={
          searchParams.get("keyword")
            ? searchParams.get("keyword")
            : SEARCH_TYPES.KOREAN[listType]
        }
      />
      <InfoListHeader listType={SEARCH_TYPES.KOREAN[listType]} />
      <SearchBarHolder>
        <SearchBar
          placeholder={SEARCH_TYPES.KOREAN[listType]}
          searchApiUrl={searchApiUrl}
        />
      </SearchBarHolder>
      <ResultBox>
        {rentees.map((rentee) => (
          <RenteeInfo
            key={rentee?.id}
            thumbnailUrl={import.meta.env.VITE_BEEP_API + rentee.thumbnailUrl}
            id={rentee?.id}
            name={rentee?.name}
            type={rentee?.type}
            bookArea={rentee?.bookArea}
            bookAuthorName={rentee?.bookAuthorName}
            rentState={rentee?.rentState}
          />
        ))}
      </ResultBox>
      {lastPage !== true && (
        <div ref={target} style={{ padding: "20px" }}>
          <ReactLoading
            type="spin"
            color={theme.firstGray}
            width="28px"
            height="28px"
          />
        </div>
      )}
    </Body>
  );
}

const SearchBarHolder = styled.div`
  width: 100%;
  max-width: 750px;
  padding: 0 15px;
  margin: 20px 0;
`;

const ResultBox = styled.div`
  width: 100%;
  max-width: 800px;
  padding: 0 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default InfoListLayout;
