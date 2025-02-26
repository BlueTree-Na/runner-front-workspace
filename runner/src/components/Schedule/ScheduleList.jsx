import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { format } from "date-fns";
import { AuthContext } from "../member/context/AuthContext";

export const PostTitle = styled.a`
  font-size: 1.2em;
  color: #3498db;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const LoadMoreButton = styled.button`
  display: inline-block;
  padding: 10px 30px;
  background-color: #3498db;
  color: #ffffff;
  border: none;
  border-radius: 20px;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2980b9;
  }

  &:disabled {
    background-color: #bdc3c7;
    cursor: not-allowed;
  }
`;

export const AddButton = styled.a`
  display: inline-block;
  padding: 10px 20px;
  background-color: #2ecc71;
  color: #ffffff;
  border: none;
  border-radius: 20px;
  font-size: 1em;
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #27ae60;
  }
`;

export const ListDiv = styled.div`
  max-width: 1000px;
  margin: 50px auto;
  padding: 20px;
  background-color: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 12px;

  @media (max-width: 768px) {
    margin: 20px;
    padding: 15px;
  }
`;

export const Message = styled.p`
  text-align: center;
  color: "#2ecc71";
  margin-bottom: 20px;
`;

const ScheduleList = () => {
  const [page, setPage] = useState(0);
  const { auth } = useContext(AuthContext);
  const navi = useNavigate();
  const [scheduleList, setScheduleList] = useState([]);

  useEffect(() => {
    axios
      .get(
        `http://localhost/schedule`,
        { params: { page: page } },
        { headers: `Bearer ${auth.accessToken}` }
      )
      .then((response) => {
        console.log(response);

        setScheduleList([...scheduleList, ...response.data]);
      })
      .catch();
  }, [page]);

  const handleMoreSchedule = () => {
    setPage((page) => page + 1);
  };

  return (
    <>
      <br />
      <h1 align="center">일정 목록</h1>

      <div align="center">
        <LoadMoreButton onClick={() => navi("/scheduleForm")}>
          일정등록
        </LoadMoreButton>
      </div>

      {scheduleList.map((schedule) => {
        return (
          <>
            <ListDiv onClick={() => navi(`/schedule/${schedule.scheduleNo}`)}>
              <PostTitle>제목 : {schedule.scheduleTitle}</PostTitle>
              <Message>일정번호 : {schedule.scheduleNo}</Message>
              <Message>작성자 : {schedule.scheduleWriter}</Message>
              <Message>내용 : {schedule.scheduleContent}</Message>
              <Message>
                등록일:{" "}
                {format(
                  new Date(schedule.enrollDate),
                  "yyyy년 MM월 dd일 a hh시 mm분"
                )}
              </Message>
              <Message>
                일정 당일:{" "}
                {format(
                  new Date(schedule.selectDate),
                  "yyyy년 MM월 dd일 a hh시 mm분"
                )}
              </Message>
              <Message>조회수 :{schedule.count}</Message>
              <Message>참여 최대인원 : {schedule.maxIncount}</Message>
              <Message>가는곳 : {schedule.place}</Message>
              <Message>
                장소 주소:{" "}
                {schedule.placeAddr
                  ? schedule.placeAddr
                  : "주소가 입력되지 않았습니다."}
              </Message>
            </ListDiv>
            <hr />
          </>
        );
      })}
      <LoadMoreButton onClick={handleMoreSchedule}>더보기</LoadMoreButton>
    </>
  );
};
export default ScheduleList;
