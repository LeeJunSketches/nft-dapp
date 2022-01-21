import HeaderBar from "../HeaderBar/HeaderBar";
import "./Page.scss";

function Page(props) {
  return (
    <div className="page">
      <HeaderBar />
      <main>{props.children}</main>
    </div>
  );
}

export default Page;
