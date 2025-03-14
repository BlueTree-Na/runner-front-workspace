import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RunningMap from "../KakaoMapAPI/RunningMap";
import { AddButton, ListDiv, Message } from "./ScheduleList";
import { format } from "date-fns";
import { AuthContext } from "../member/context/AuthContext";

const ScheduleDetail = () => {
  const { id } = useParams();
  const [schedule, setSchedule] = useState({});
  const { auth } = useContext(AuthContext);
  const navi = useNavigate();

  useEffect(() => {
    if (!auth.accessToken) {
      alert("로그인 후 이용 가능합니다.");
      navi("/login");

      return;
    }

    axios
      .get(`http://localhost/schedule/${id}`, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
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
          Authorization: `Bearer ${auth.accessToken}`,
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
              placeName={schedule.place}
            />
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
            {auth.nickname === schedule.scheduleWriter && (
              <>
                <AddButton type="submit">수정하기</AddButton>
                <AddButton type="button" onClick={handleDelete}>
                  삭제하기
                </AddButton>
              </>
            )}
            <AddButton type="button" onClick={() => navi("/schedule")}>
              이전으로
            </AddButton>
          </form>
          <br />
          <div>
            <AddButton onClick={handleScheduleEncount}>일정 참여</AddButton>
          </div>
        </ListDiv>
      }
    </>
  );
};

export default ScheduleDetail;
