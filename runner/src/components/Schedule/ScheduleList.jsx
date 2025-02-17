import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ScheduleList = () => {
  const [page, setPage] = useState(0);
  const navi = useNavigate();
  const [scheduleList, setScheduleList] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost/schedule`, { params: { page: page } })
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
      <h1>하이하이~</h1>
      {scheduleList.map((schedule) => {
        return (
          <>
            <div onClick={() => navi(`/schedule/${schedule.scheduleNo}`)}>
              일정번호 :<input type="text" value={schedule.scheduleNo}></input>
              <br />
              작성자 :
              <input type="text" value={schedule.scheduleWriter}></input>
              <br />
              제목 :<input type="text" value={schedule.scheduleTitle}></input>
              <br />
              내용 :<input type="text" value={schedule.scheduleContent}></input>
              <br />
              일정 당일 :<input type="text" value={schedule.selectDate}></input>
              <br />
              등록일 :<input type="text" value={schedule.enrollDate}></input>
              <br />
              조회수 :<input type="text" value={schedule.count}></input>
              <br />
              참여 최대인원 :
              <input type="text" value={schedule.maxIncount}></input>
              <br />
              가는곳 :<input type="text" value={schedule.place}></input>
              <br />
              위도 :<input type="text" value={schedule.placeLat}></input>
              <br />
              경도 :<input type="text" value={schedule.placeLon}></input>
              <br />
              장소 주소:
              <input type="text" value={schedule.placeAddr}></input>
              <br />
            </div>
            <hr />
          </>
        );
      })}
      <button onClick={handleMoreSchedule}>더보기</button>
    </>
  );
};
export default ScheduleList;
