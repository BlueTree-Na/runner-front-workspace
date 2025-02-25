import RunningMap from "../KakaoMapAPI/RunningMap";
import { AddButton, ListDiv } from "./ScheduleList";
import { useState, useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../member/context/AuthContext";
const kakao = window;

const ScheduleForm = () => {
  const [schedule, setSchedule] = useState({});
  const { auth } = useContext(AuthContext);

  // setSchedule(() => {
  //   return { ...schedule, scheduleWriter: auth.nickname };
  // });

  useEffect(() => {
    kakao.maps.event.addListener(map, "click", function (mouseEvent) {
      const latlng = mouseEvent.latLng;
      marker.setPosition(latlng);
      // const message = `클릭한 위치의 위도는 ${latlng.getLat()} 이고, 경도는 ${latlng.getLng()} 입니다`;

      // const resultDiv = document.getElementById("clickLatlng");
      // resultDiv.innerHTML = message;
    });
  }, []);

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
        <input type="hidden" name="scheduleWriter" value={auth.nickname} />
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
        {
          <ListDiv>
            <RunningMap
              lat={schedule.placeLat}
              lng={schedule.placeLon}
              mapId={1}
            />
          </ListDiv>
        }
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
