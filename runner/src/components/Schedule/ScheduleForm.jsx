import RunningMap from "../KakaoMapAPI/RunningMap";
import { AddButton, ListDiv } from "./ScheduleList";
import { useState, useEffect } from "react";
import axios from "axios";

const ScheduleForm = () => {
  const [schedule, setSchedule] = useState({});

  const handleInput = (e) => {
    const { name, value } = e.target;
    // console.log(name);
    // console.log(value);
    setSchedule((schedule) => {
      return {
        ...schedule,
        [name]: value,
      };
    });
    // console.log(schedule);
  };

  const handleScheduleInsert = (e) => {
    e.preventDefault();

    axios.post();
  };

  return (
    <ListDiv>
      <h2>일정 세부 정보</h2>
      <form method="post" onSubmit={handleScheduleInsert}>
        작성자 : <input type="text" value={schedule.scheduleWriter}></input>
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
        <RunningMap lat={schedule.placeLat} lng={schedule.placeLon} mapId={1} />
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
