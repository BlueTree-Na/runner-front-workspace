import RunningMap from "../KakaoMapAPI/RunningMap";
import ScheduleList, { AddButton, ListDiv } from "./ScheduleList";
import { useState, useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../member/context/AuthContext";
import RunningMapList from "../RunningCourse/RunningMapList";

const kakao = window;

const ScheduleForm = () => {
  const [schedule, setSchedule] = useState({});
  const { auth } = useContext(AuthContext);
  const [course, setCourse] = useState();

  const handleInput = (e) => {
    const { name, value } = e.target;

    setSchedule((schedule) => {
      return {
        ...schedule,
        [name]: value,
      };
    });
    console.log(schedule);
  };

  const handleScheduleInsertForm = (e) => {
    e.preventDefault();

    axios.post();
  };

  return (
    <ListDiv>
      <h2>일정 등록</h2>
      <form method="post" onSubmit={handleScheduleInsertForm}>
        <input type="hidden" name="scheduleWriter" value={auth.username} />
        <br />
        제목 :{" "}
        <input
          type="text"
          value={schedule.scheduleTitle}
          name="scheduleTitle"
          onChange={handleInput}
        ></input>
        <br />
        내용 :{" "}
        <input
          value={schedule.scheduleContent}
          onChange={handleInput}
          name="scheduleContent"
        ></input>
        <br />
        일정 당일 :
        <input
          type="datetime-local"
          name="selectDate"
          value={schedule.selectDate}
          onChange={handleInput}
        ></input>
        <br />
        참여 최대인원 :
        <input
          type="number"
          value={schedule.maxIncount}
          name="maxIncount"
          onChange={handleInput}
        ></input>
        <br />
        <RunningMapList setCourse={setCourse} />
        위도 :{" "}
        <input
          type="text"
          name="placeLat"
          value={schedule.placeLat}
          onChange={handleInput}
        />
        <br />
        경도 :{" "}
        <input
          type="text"
          name="placeLon"
          value={schedule.placeLon}
          onChange={handleInput}
        />
        <br />
        가는곳 :{" "}
        <input
          type="text"
          value={schedule.place}
          name="place"
          onChange={handleInput}
        ></input>
        <br />
        장소 주소:{" "}
        <input
          type="text"
          value={schedule.placeAddr}
          name="placeAddr"
          onChange={handleInput}
        ></input>
        <br />
        <AddButton type="submit">등록하기</AddButton>
      </form>
    </ListDiv>
  );
};
export default ScheduleForm;
