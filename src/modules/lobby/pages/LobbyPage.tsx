import { useEffect, useState } from "react";
import { useStore } from "../../../store/useStore";
import { AppLayout } from "../../common/cmps/AppLayout";

export const LobbyPage = () => {
  const user = useStore((state) => state.user);
  const [layoutId, setLayoutId] = useState<string>('default');

  useEffect(() => {
    console.log('staging...');
    
    setLayoutId(user?.selectedLayout || 'default');
  }, [user]); // Watch for any user changes
  
  return (
    <section className="lobby-page">
      <AppLayout layoutId={layoutId} />
    </section>
  );
};
