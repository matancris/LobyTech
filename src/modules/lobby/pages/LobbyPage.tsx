import { useStore } from "../../../store/useStore";
import { AppLayout } from "../../common/cmps/AppLayout";
import { useEffect } from "react";
import { ManagerMsgsContainer } from "../cmps/ManagerMsgsContainer";
import { MediaCmpContainer } from "../cmps/MediaCmpContainer";

export const LobbyPage = () => {
  const managerMsgs = useStore((state) => state.managerMsgs);
  const getManagerMsgs = useStore((state) => state.getManagerMsgs);

  useEffect(() => {
    getManagerMsgs(); // Fetch manager messages on mount
  }, [getManagerMsgs]);

  return (
    <section className="lobby-page">
      <AppLayout layout="default">
        {/* <LobbyAdList /> */}
        <MediaCmpContainer mediaType="video" id="lobby-ad-preview" />
        <ManagerMsgsContainer managerMsgs={managerMsgs} />
        <MediaCmpContainer mediaType="choose" id="main-page-preview" />
      </AppLayout>

    </section>
  );
};
