import React, { useState, useEffect } from "react";
import RunningList from "../RunningCourse/RunningList";
const { kakao } = window;

const PlaceMap = (props) => {
  const { courseList } = { ...props };
  const [course, setCourse] = useState();

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "//dapi.kakao.com/v2/maps/sdk.js?appkey=3dbe69a486a929ec9f54859e2dc2a8c6";
    script.async = true;
    document.head.appendChild(script);

    // script.onload = () => {};
    const container = document.getElementById(`running`);
    const options = {
      center: new kakao.maps.LatLng(37.566535, 126.9779692),
      level: 9,
    };
    const map = new kakao.maps.Map(container, options);

    courseList.map((course) => {
      const courseLatLng = new kakao.maps.LatLng(
        course.courseLat,
        course.courseLon
      );

      const marker = new kakao.maps.Marker({
        map: map,
        position: courseLatLng,
      });

      const name = course.courseFlagName;

      const infowindow = new kakao.maps.InfoWindow({
        content: `<div style="padding:5px; color:black;">${
          name ? name : " "
        }</div>`,
      });

      infowindow.open(map, marker);

      marker.setMap(map);

      kakao.maps.event.addListener(marker, "click", function () {
        setCourse(course);
      });

      marker.setMap(map);
    });
  }, [courseList]);

  return (
    <>
      <div id={`running`} style={{ width: "100%", height: "480px" }}></div>
      <br />
      {course && <RunningList course={course} />}
    </>
  );
};

export default PlaceMap;
