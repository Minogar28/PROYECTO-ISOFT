import { Helmet } from "react-helmet-async";
const PageMetaData = ({
  title
}) => {
  return <Helmet>
      <title> {title} | CELERIUM </title>
    </Helmet>;
};
export default PageMetaData;