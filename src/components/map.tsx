import { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";

import { Input } from "antd";
import _ from "lodash";

export const Map = ({
  lng,
  lat,
  setLng,
  setLat,
}: {
  lng: number | undefined;
  lat: number | undefined;
  setLng: (v: number | undefined) => void;
  setLat: (v: number | undefined) => void;
}) => {
  const map = useRef();
  const makers = useRef<any[]>([]);
  const [address, setAddress] = useState("");

  useEffect(() => {
    map.current = new (window as any).AMap.Map("map", {
      resizeEnable: true,
    });

    (window as any).AMap.plugin("AMap.PlaceSearch", () => {
      const placeSearch = new (window as any).AMap.PlaceSearch();
      address &&
        placeSearch.search(address, (status: any, result: any) => {
          if (status === "complete") {
            makers.current?.length &&
              (map.current as any).remove(makers.current);
            if (result.poiList.pois.length) {
              const pois = result.poiList.pois;
              let makerList: any[] = [];
              for (let i = 0; i < pois.length; i++) {
                makerList[i] = new (window as any).AMap.Marker({
                  position: pois[i].location,
                  title: `${pois[i].location.lng},${pois[i].location.lat}`,
                  label: {
                    content: pois[i].name,
                  },
                });
                makerList[i].on("click", (e: any) => {
                  setLng(e.lnglat.getLng());
                  setLat(e.lnglat.getLat());
                });
                (map.current as any).add(makerList[i]);
              }
              makers.current = makerList;
              (map.current as any).setFitView();
            }
          }
        });
    });
  }, [address, lat, lng, makers, setLat, setLng]);

  return (
    <MapContainer>
      <div id="map" style={{ height: "30rem" }} />
      <MapSearch>
        <Input
          style={{ width: "40rem" }}
          onChange={_.debounce((e: any) => setAddress(e.target.value), 500)}
          placeholder="请输入具体地址"
        />
      </MapSearch>
    </MapContainer>
  );
};

const MapContainer = styled.div`
  position: relative;
  margin-bottom: 4.2rem;
  height: 30rem;
`;

const MapSearch = styled.div`
  position: absolute;
  left: 2.4rem;
  top: 2.4rem;
  display: flex;
  align-items: center;
  > input {
    margin-right: 1rem;
  }
`;
