
import { useStore } from "../../../store/useStore";
import { AppLayout } from "../../common/cmps/AppLayout"
import { LobbyAdList } from "../cmps/LobbyAdList"
import { useEffect } from "react";
import { ManagerMsgsContainer } from "../cmps/ManagerMsgsContainer";
import LobbyImg from "../../../assets/imgs/lobby-display.jpg"


export const LobbyPage = () => {

  const managerMsgs = useStore((state) => state.managerMsgs);
  const getManagerMsgs = useStore((state) => state.getManagerMsgs);

  useEffect(() => {
    getManagerMsgs(); // Fetch manager messages on mount
  }, [getManagerMsgs]);

  return (
    <section className="lobby-page">
      <AppLayout layout="default">
        <LobbyAdList />
        <ManagerMsgsContainer managerMsgs={managerMsgs}/>
        {/* <img src={LobbyImg} alt="" /> */}
      </AppLayout>
    </section>
  )
}
