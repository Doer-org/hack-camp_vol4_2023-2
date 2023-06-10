import * as styles from "../styles/avatar.css";

type Props = {
  image?: string;
  size: "tiny" | "small" | "medium" | "large";
  onClick?: () => void;
};

const _Avatar = ({ size, image, ...props }: Props) => {
  return (
    <div
      className={[styles.size[size], styles.wrapperStyle].join(" ")}
      {...props}
    >
      {image && (
        <img className={styles.imageStyle} src={image} alt="アバター" />
      )}
    </div>
  );
};

export const Avatar = _Avatar;
