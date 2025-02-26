import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { LoadMoreButton } from "../Schedule/ScheduleList";
import PlaceMap from "../KakaoMapAPI/PlaceMap";

export const CourseListUl = styled.ul`
  color: white;
  list-style: none;
  padding: 0;
`;

export const CourseListLi = styled.li`
  padding: 15px;
  border-bottom: 1px solid #dddddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(${(props) => props.red * 0.5}, 20, 60);

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #f9f9f9;
    cursor: pointer;
    color: black;
  }
`;

export const CourseMapDiv = styled.div`
  max-width: 1200px;
  margin: 50px auto;
  padding: 30px;
  background-color: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 12px;

  @media (max-width: 768px) {
    margin: 20px;
    padding: 20px;
  }
`;

export const CourseListDiv = styled.div`
  max-width: 800px;
  margin: 50px auto;
  padding: 30px;
  background-color: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 12px;

  @media (max-width: 768px) {
    margin: 20px;
    padding: 20px;
  }
`;

const RunningMapList = (props) => {
  const [courseList, setCourseList] = useState([]);
  const [page, setPage] = useState(0);
  const [isLoad, setIsLoad] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost/course`, { params: { page: page } })
      .then((response) => {
        if (response.data.length < 10) {
          alert("더 이상 불러올 수 없습니다.");

          return;
        }
        setCourseList([...courseList, ...response.data]);

        setIsLoad(false);
      })
      .catch((error) => console.log(error));
  }, [page]);

  const handlePage = () => {
    setPage((page) => page + 1);
  };

  console.log(courseList);

  // if (isLoad) {
  //   return <></>;
  // }

  return (
    <>
      <CourseMapDiv>
        <div>
          <h3 style={{ display: "inline-block" }}>산책로 위치</h3>
          <LoadMoreButton
            type="button"
            style={{ float: "right" }}
            onClick={handlePage}
          >
            더보기
          </LoadMoreButton>
        </div>
        <br />
        {!isLoad && <PlaceMap courseList={courseList} />}
      </CourseMapDiv>
    </>
  );
};

export default RunningMapList;
