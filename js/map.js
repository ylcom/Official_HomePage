let map;

async function initMap() {
  // The location of Uluru
  const position = { lat: 37.373773, lng: 126.946585 };
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  // The map, centered at Uluru
  map = new Map(document.getElementById("map"), {
    zoom: 18,
    center: position,
    mapId: "DEMO_MAP_ID",
  });

  // The marker, positioned at Uluru
  const marker = new AdvancedMarkerElement({
    map: map,
    position: position,
    title: "ylcompany",
  });
}

initMap();

// let map;
//   // 지도 출력
//   async function initMap() {
//     // The location of Uluru
//     const position = { lat: -25.344, lng: 131.031 };
//     // Request needed libraries.
//     //@ts-ignore
//     const { Map } = await google.maps.importLibrary("maps");
//     const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
  
//     // The map, centered at Uluru
//     map = new Map(document.getElementById("map"), {
//       zoom: 4,
//       center: position,
//       mapId: "DEMO_MAP_ID",
//     });
  
//     // The marker, positioned at Uluru
//     const marker = new AdvancedMarkerElement({
//       map: map,
//       position: position,
//       title: "Uluru",
//     });
//   }
//   initMap(); // 맵 생성
  
  // 지도의 중심을 변경하는 작업
  // function changeMap1(){
  //     var ll = {lat:35.661625, lng: 125.239803};
  //     map.panTo(ll);
  //     map.setZoom(16);
  // } 
  // // 새로운 지도를 여는 작업 -> 마커 지워짐
  // function changeMap2(){
  //   var ll = {lat:-40.339098, lng: 175.609729};
  //   map = new google.maps.Map(
  //           document.getElementById("map"),
  //           {zoom:17, center: ll}
  //           );
  // }
  // 거리뷰를 새창으로 보여주는 작업
  // function changeMap3(){
  //     window.open('pano.html','',width=300,height=300);
  // }