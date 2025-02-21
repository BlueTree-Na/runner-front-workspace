import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RunningMap from "../KakaoMapAPI/RunningMap";
import { AddButton, ListDiv, Message } from "./ScheduleList";
import { format } from "date-fns";

const ScheduleDetail = () => {
  const { id } = useParams();
  const [schedule, setSchedule] = useState({});
  const navi = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost/schedule/${id}`, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMTExIiwiaWF0IjoxNzQwMDI4NDc3LCJleHAiOjE3NDAxMTQ4Nzd9.jzufNcDN7K6vrXSfn4Bab_0vccecYBWR7eFDri7v3d4",
        },
      })
      .then((response) => {
        // console.log(response.data);
        setSchedule(response.data);
      })
      .catch();
  }, []);

  const handleScheduleUpdate = (e) => {
    if (!(schedule.scheduleWriter === "")) {
      alert("작성자만 수정이 가능합니다.");
      return;
    }

    e.preventDefault();
    // console.log(schedule);

    axios.put(
      `http://localhost/schedule/${schedule.scheduleNo}`,
      { ...schedule },
      {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMTExIiwiaWF0IjoxNzQwMDI4NDc3LCJleHAiOjE3NDAxMTQ4Nzd9.jzufNcDN7K6vrXSfn4Bab_0vccecYBWR7eFDri7v3d4`,
        },
      }
    );
  };

  const handleScheduleEncount = () => {};

  const handleDelete = () => {
    if (!(schedule.scheduleWriter === "")) {
      alert("작성자만 삭제할 수 있습니다.");
      return;
    }
  };

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

  return (
    <>
      {
        <ListDiv>
          <h2>일정 세부 정보</h2>
          <form method="put" onSubmit={handleScheduleUpdate}>
            일정번호 : <input type="text" value={schedule.scheduleNo}></input>
            <br />
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
            <RunningMap
              lat={schedule.placeLat}
              lng={schedule.placeLon}
              mapId={1}
            />
            가는곳 :{" "}
            <input
              type="text"
              value={schedule.place}
              name="place"
              onChange={handleInput}
            ></input>
            <br />
            장소 주소:{" "}
            {schedule.placeAddr && (
              <input
                type="text"
                value={schedule.placeAddr}
                name="placeAddr"
                onChange={handleInput}
              ></input>
            )}
            <Message>
              등록일 :{" "}
              {schedule.enrollDate &&
                format(
                  new Date(schedule.enrollDate),
                  "yyyy년 MM월 dd일 a hh시 mm분"
                )}
            </Message>
            <Message>조회수 : {schedule.count}</Message>
            <AddButton type="submit">수정하기</AddButton>
            <AddButton type="button" onClick={handleDelete}>
              삭제하기
            </AddButton>
            <AddButton type="button" onClick={() => navi("/schedule")}>
              이전으로
            </AddButton>
          </form>
          <div>
            <AddButton onClick={handleScheduleEncount}>일정 참여</AddButton>
          </div>
        </ListDiv>
      }
    </>
  );
};

export default ScheduleDetail;
