import React, { useEffect } from "react";
import { VideoSDKMeeting } from "@videosdk.live/rtc-js-prebuilt";
import { v4 as uuid } from 'uuid';


export default function AudioCall(props) {
	const unique_id = uuid();
	const small_id = unique_id.slice(0,8)
  useEffect(() => {
    const config = {
      name: "Rai",
      meetingId: "invictus-maneo",
      apiKey: "88cf6ce7-8796-408c-a5c0-3175c7c5c2d6",

      containerId: null,

      micEnabled: true,
      webcamEnabled: false,
      participantCanToggleSelfWebcam: true,
      participantCanToggleSelfMic: true,

      chatEnabled: true,
      screenShareEnabled: true,
    };

    const meeting = new VideoSDKMeeting();
    meeting.init(config);
  }, []);

  return <div></div>;
}
