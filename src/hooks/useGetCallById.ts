import { useEffect, useState } from "react";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";

export const useGetCallById = (id: string | string[]) => {
  const [call, setCall] = useState<Call>();
  const [isCallLoading, setIsCallLoading] = useState(true);
  const [callError, setCallError] = useState("");

  const client = useStreamVideoClient();

  useEffect(() => {
    const loadCall = async () => {
      try {
        if (!client) {
          setCallError("Client not initialized");
          return;
        }

        // https://getstream.io/video/docs/react/guides/querying-calls/#filters
        const { calls } = await client.queryCalls({
          filter_conditions: { id },
        });

        if (calls.length > 0) {
          setCall(calls[0]);
        }
      } catch (error) {
        console.log("🚀 ~ loadCall ~ error:", error);
        setCallError("Error querying calls");
      } finally {
        setIsCallLoading(false);
      }
    };

    loadCall();
  }, [client, id]);

  return { call, isCallLoading, callError };
};
