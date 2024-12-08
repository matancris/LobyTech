import { useEffect, useState } from 'react';

type SvgComponentType = React.FunctionComponent<React.SVGAttributes<SVGElement>>;
import LocationIcon from '@/assets/icons/location.svg?react';
import FavoriteIcon from '@/assets/icons/favorite.svg?react';
import EditIcon from '@/assets/icons/edit.svg?react';
import DeleteIcon from '@/assets/icons/delete.svg?react';
import AddIcon from '@/assets/icons/add.svg?react';
import FaceIcon from '@/assets/icons/face.svg?react';
import CloseIcon from '@/assets/icons/close.svg?react';
import ArrowDownIcon from '@/assets/icons/arrow-down.svg?react';

const categoryIconMap = {
  location: LocationIcon,
  favorite: FavoriteIcon,
  edit: EditIcon,
  delete: DeleteIcon,
  add: AddIcon,
  face: FaceIcon,
  close: CloseIcon,
  'arrow-down': ArrowDownIcon,

};

interface Props {
  iconName: string;
  onClick?: () => void;
}

export const AppIcon = ({ iconName, onClick }: Props) => {
  const [Icon, setIcon] = useState<SvgComponentType | null>(null);

  useEffect(() => {
    async function getIcon() {
      if (iconName) {
        setIcon(() => (categoryIconMap as Record<string, SvgComponentType>)[iconName]);
      }
    }
    getIcon();
  }, [iconName]);

  return (
    Icon && (
      <section className="app-icon flex center-center" onClick={onClick} data-testid="app-icon">
        <Icon />
      </section>
    )
  );
};
