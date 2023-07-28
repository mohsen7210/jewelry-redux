import React from "react";
import "./styles/footer.css";

const Footerr = () => {
  const date = new Date();
  return (
    <footer>
      <small>
        Copyright &copy; {date.getFullYear()} All right reserved. Made with ❤️
        by Mohsen{" "}
      </small>
    </footer>
  );
};

export default Footerr;
