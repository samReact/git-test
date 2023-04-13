type Props = {
  src: string;
};

export const ImgCell = (props: Props) => {
  const { src } = props;

  return (
    <td>
      <img src={src} alt="a beer" width={50} />
    </td>
  );
};
