import React from "react";
import { CSR_IMAGE } from "../../constants/variables";
import { ProgressBar } from "baseui/progress-bar";
function Header(props) {
  const { progressBarValue, selectedSection } = props;
  return (
    <>
      <div className='p-0'>
        <ProgressBar
          value={progressBarValue}
          shape='pill'
          uccessValue={100}
          size='large'
        />
      </div>
      <div className='flex justify-center'>
        <img
          src={CSR_IMAGE[selectedSection.sectionText]}
          alt='Section Logo'
          className='mt-4'
        />
      </div>
      <div className='text-center font-bold mt-4'>
        {selectedSection.sectionText}
      </div>

      <div
        className='mt-4'
        style={{ backgroundColor: "#E3EBF3", height: "0.1rem" }}
      ></div>
    </>
  );
}

export default Header;
