import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout(props) {
  const { setActiveUser, setLoginStatus } = props;
  const nav = useNavigate();

  useEffect(() => {
    setActiveUser({ _id: "", pixelTime: "" });
    setLoginStatus(false);
    nav("/");
  }, [setActiveUser, setLoginStatus, nav])
}

export default Logout;
