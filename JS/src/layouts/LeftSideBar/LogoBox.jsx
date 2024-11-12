import { Link } from "react-router-dom";
import logo from "@src/assets/images/logoCelerium.png";
import logoDark from "@src/assets/images/logoCelerium.png";
import { useLayoutContext } from "@src/states";
import { styled } from "@mui/system";
const LogoBox = ({
  defaultTheme,
  backgroundColor
}) => {
  const {
    settings
  } = useLayoutContext();
  const {
    sidenav: {
      theme
    }
  } = settings;
  const LogoBoxWrapper = styled("div")(({
    settings
  }) => {
    return {
      backgroundColor: backgroundColor ? settings.sidenav.theme == "light" ? "#A0FFFF " : "#212428" : "transparent",
      height: "70px",
      position: "sticky",
      top: 0,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 2
    };
  });
  return <LogoBoxWrapper settings={settings}>
      <Link to="/" style={{
      justifyContent: "center",
      display: "flex"
    }}>
        <img src={(defaultTheme ?? theme) == "light" ? logoDark : logo} height={42} width={194} />
      </Link>
    </LogoBoxWrapper>;
};
export default LogoBox;