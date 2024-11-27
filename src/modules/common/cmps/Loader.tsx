interface Props {
  isInnerLoader?: boolean;
  color?: string;
  size?: number;
}
export const Loader = (props: Props) => {
  const { isInnerLoader, color = '#FFF', size = 48 } = props;
  const borderSize = Math.ceil(size / 10);

  return (
    <div className={`loader-container ${isInnerLoader ? 'inner' : ''}`}>
      <div className="loader" style={{ '--loader-color': color, width: size + 'px', height: size + 'px', '--border-size': borderSize + 'px' } as React.CSSProperties}></div>
    </div>
  );
};
