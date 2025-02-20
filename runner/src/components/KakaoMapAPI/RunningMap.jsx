import React, { useEffect } from "react";
const { kakao } = window;

const RunningMap = (props) => {
  const { lat, lng, mapId } = { ...props };

  const script = document.createElement("script");

  script.src =
    "//dapi.kakao.com/v2/maps/sdk.js?appkey=3dbe69a486a929ec9f54859e2dc2a8c6";
  script.async = true;

  document.head.appendChild(script);

  useEffect(() => {
    const container = document.getElementById(`running${mapId}`);
    const options = {
      center: new kakao.maps.LatLng(lat, lng),
      level: 4,
    };
    const map = new kakao.maps.Map(container, options);

    const marker = new kakao.maps.Marker({
      position: map.getCenter(),
    });

    marker.setMap(map);
  }, [lat, lng]);

  return (
    <>
      <div
        id={`running${mapId}`}
        style={{ width: "740px", height: "360px" }}
      ></div>
    </>
  );
};
export default RunningMap;
