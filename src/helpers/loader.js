import LoadingOverlay from "react-loading-overlay";
import { BeatLoader } from "react-spinners";

export default function Loader({ isLoading, children }) {
  return (
    <LoadingOverlay
      active={isLoading}
      spinner={<BeatLoader color='#4A90E2' loading={true} size={80} />}
    >
      {children}
    </LoadingOverlay>
  );
}
