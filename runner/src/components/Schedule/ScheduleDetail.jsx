import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ScheduleDetail = () => {
  const { id } = useParams();
  const [schedule, setSchedule] = useState({});
  const navi = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost/schedule/${id}`, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzanNqIiwiaWF0IjoxNzM5NzYxMjk4LCJleHAiOjE3Mzk4NDc2OTh9.8wV5yhrzpTFCWm6LF0hmxEgwP9R2BC8xXNNzgAAy5Cc",
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
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzanNqIiwiaWF0IjoxNzM5NzYxMjk4LCJleHAiOjE3Mzk4NDc2OTh9.8wV5yhrzpTFCWm6LF0hmxEgwP9R2BC8xXNNzgAAy5Cc`,
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
      <h2>일정 세부 정보</h2>
      {
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
            type="text"
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
          등록일 :
          <input type="datetime-local" value={schedule.enrollDate}></input>
          <br />
          조회수 : <input type="text" value={schedule.count}></input>
          <br />
          참여 최대인원 :
          <input
            type="number"
            value={schedule.maxIncount}
            name="maxIncount"
            onChange={handleInput}
          ></input>
          <br />
          가는곳 :{" "}
          <input
            type="text"
            value={schedule.place}
            name="place"
            onChange={handleInput}
          ></input>
          <br />
          위도 : <input type="text" value={schedule.placeLat}></input>
          <br />
          경도 : <input type="text" value={schedule.placeLon}></input>
          <br />
          장소 주소:{" "}
          <input
            type="text"
            value={schedule.placeAddr}
            name="placeAddr"
            onChange={handleInput}
          ></input>
          <br />
          {<button type="submit">수정하기</button>}
          {
            <button type="button" onClick={handleDelete}>
              삭제하기
            </button>
          }
          <button type="button" onClick={() => navi("/schedule")}>
            이전으로
          </button>
        </form>
      }
      <div>
        <button onClick={handleScheduleEncount}>일정 참여</button>
      </div>
    </>
  );
};

export default ScheduleDetail;
