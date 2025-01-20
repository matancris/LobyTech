import { useStore } from "../../../store/useStore";
import { AppLayout } from "../../common/cmps/AppLayout";

export const LobbyPage = () => {
  const user = useStore((state) => state.user);
  const layoutId = user?.selectedLayout || 'default';
  
  return (
    <section className="lobby-page">
      <AppLayout layoutId={layoutId} />
    </section>
  );
};
