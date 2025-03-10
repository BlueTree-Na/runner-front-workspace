import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { LoadMoreButton } from "../Schedule/ScheduleList";
import RunningMap from "../KakaoMapAPI/RunningMap";
import PlaceMap from "../KakaoMapAPI/PlaceMap";
import RunningMapList from "./RunningMapList";

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

const RunningList = ({ course }) => {
  return (
    <>
      <CourseListDiv>
        <CourseListUl>
          <CourseListLi red={25}>고유ID : {course.runningId}</CourseListLi>
          <CourseListLi red={45}>
            산책경로구분명 : {course.courseFlagName}
          </CourseListLi>
          <CourseListLi red={65}>산책경로명 : {course.courseName}</CourseListLi>
          <CourseListLi red={85}>
            경로설명 : {course.courseContent}
          </CourseListLi>
          <CourseListLi red={105}>시군구명 : {course.sigunguName}</CourseListLi>
          <CourseListLi red={125}>
            경로레벨명 : {course.courseLevelName}
          </CourseListLi>
          <CourseListLi red={145}>
            경로길이내용 : {course.courseLengthName}
          </CourseListLi>
          <CourseListLi red={165}>
            경로상세길이내용 : {course.courseLenDetail}
          </CourseListLi>
          <CourseListLi red={185}>추가설명 : {course.aditContent}</CourseListLi>
          <CourseListLi red={205}>
            경로시간내용 : {course.courseTime}
          </CourseListLi>
          <CourseListLi red={225}>
            옵션설명 : {course.optionContent}
          </CourseListLi>
          <CourseListLi red={245}>
            화장실설명 : {course.toiletContent}
          </CourseListLi>
          <CourseListLi red={265}>편의시설명 : {course.cvntlName}</CourseListLi>
          <CourseListLi red={285}>지번주소 : {course.loadAddr}</CourseListLi>
        </CourseListUl>
      </CourseListDiv>
    </>
  );
};

export default RunningList;
