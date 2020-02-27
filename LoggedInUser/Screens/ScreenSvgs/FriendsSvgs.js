import React, { Component } from "react";
import { Text , View } from "react-native";
import Svg, {
  G,
  Path,
  Rect,
  Defs,
  ClipPath,
} from "react-native-svg";
export function SearchCurvedHeader() {
  return (
      <View >
          <Svg
        xmlns="http://www.w3.org/2000/svg"
        width="377"
        height="131.149"
        viewBox="0 0 377 131.149"
        
      >
        <Defs onPress={()=>{
                alert("Pressed");
            }}>
          <ClipPath id="clip-path">
            <Rect width="24" height="24" fill="none" />
          </ClipPath>
        </Defs>
        <G id="top" transform="translate(1 -2)" >
          <G
            id="bg"
            transform="translate(0 3)"
            fill="#fff"
            stroke="#e7e4e9"
            stroke-width="1"
          >
            <Path
              d="M0,0H375a0,0,0,0,1,0,0V129.149a0,0,0,0,1,0,0H80a80,80,0,0,1-80-80V0A0,0,0,0,1,0,0Z"
              stroke="none"
            />
            <Path
              d="M0-.5H375a.5.5,0,0,1,.5.5V129.149a.5.5,0,0,1-.5.5H80A80.5,80.5,0,0,1-.5,49.149V0A.5.5,0,0,1,0-.5Z"
              fill="none"
            />
          </G>
          <View style={{ top: '270%' , marginHorizontal: '20%' }}>
          
          </View>
          
          <G
            id="Icons_search_gray"
            data-name="Icons/search/gray"
            transform="translate(327 25.609)"
            clip-path="url(#clip-path)"
           
          >
            <Rect
              id="bg-2"
              data-name="bg"
              width="24"
              height="24"
              fill="rgba(52,151,253,0)"
            />
            <Path
              id="ico"
              d="M15.117,13.96,19.76,18.6A.818.818,0,0,1,18.6,19.76L13.96,15.117a7.363,7.363,0,1,1,1.157-1.157ZM9.364,15.091A5.727,5.727,0,1,0,3.636,9.364,5.727,5.727,0,0,0,9.364,15.091Z"
              transform="translate(1 1)"
              fill="#757575"
            />
          </G>
        </G>
      </Svg>
      </View>
      
  );
}
