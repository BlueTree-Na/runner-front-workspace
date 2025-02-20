import React, { useEffect } from "react";
const { kakao } = window;

const RunningMap = (props) => {
  const lat = props.lat;
  const lng = props.lng;

  const script = document.createElement("script");
  script.src =
    "//dapi.kakao.com/v2/maps/sdk.js?appkey=3dbe69a486a929ec9f54859e2dc2a8c6";
  script.async = true;
  document.head.appendChild(script);

  useEffect(() => {
    const container = document.getElementById("running");
    const options = {
      center: new kakao.maps.LatLng(lat, lng),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);
  }, []);

  return (
    <>
      <div id="running" style={{ width: "800px", height: "360px" }}></div>
    </>
  );
};
export default RunningMap;
