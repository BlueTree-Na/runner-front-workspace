import React, { useEffect } from "react";
const { kakao } = window;

const PlaceMap = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "//dapi.kakao.com/v2/maps/sdk.js?appkey=3dbe69a486a929ec9f54859e2dc2a8c6";
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      const container = document.getElementById("kh");
      const options = {
        center: new kakao.maps.LatLng(37.567919, 126.983052),
        level: 3,
      };
      const map = new kakao.maps.Map(container, options);

      const mapContainer = document.getElementById("map");
      const mapOption = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      };
      const map2 = new kakao.maps.Map(mapContainer, mapOption);

      const marker = new kakao.maps.Marker({
        position: map2.getCenter(),
      });

      marker.setMap(map2);

      kakao.maps.event.addListener(map2, "click", function (mouseEvent) {
        const latlng = mouseEvent.latLng;
        marker.setPosition(latlng);

        const message = `클릭한 위치의 위도는 ${latlng.getLat()} 이고, 경도는 ${latlng.getLng()} 입니다`;

        const resultDiv = document.getElementById("clickLatlng");
        resultDiv.innerHTML = message;
      });
    };
  }, []);

  return (
    <div>
      <h1>지도 띄우기</h1>
      <div id="kh" style={{ width: "1200px", height: "600px" }}></div>
      <div id="map" style={{ width: "100%", height: "350px" }}></div>
      <p>
        <em>지도를 클릭해주세요!</em>
      </p>
      <div id="clickLatlng"></div>
    </div>
  );
};

export default PlaceMap;
