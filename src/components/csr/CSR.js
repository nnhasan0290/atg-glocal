import React, { useState } from "react";

import Body from "./Body";
import Footer from "./Footer";
import Header from "./Header";

const CSR = ({ csrDetails, orgData }) => {
  const [progressBarValue, setProgressBarValue] = useState(12.5);
  const [csrValue, setCsrValue] = useState(new Map());
  const [selectedSection, setSelectedSection] = useState(orgData.sections[0]);
  const [progressStep, setProgressStep] = React.useState(0);

  return (
    <div>
      <div className='text-center mt-8 font-bold'>
        <h2>
          <strong>CSR Funding Eligibility Test</strong>
        </h2>
      </div>
      <div className='text-center'>
        <strong>
          All Questions are Compulsory. One cannot move forward without
          selecting any option.
        </strong>
      </div>
      <div className='sm:max-w-xl sm:mx-auto custom-card mt-8'>
        <Header
          progressBarValue={progressBarValue}
          selectedSection={selectedSection}
        />

        <Body
          progressStep={progressStep}
          csrValue={csrValue}
          setCsrValue={setCsrValue}
          selectedSection={selectedSection}
          setProgressStep={setProgressStep}
        />
        <Footer
          progressBarValue={progressBarValue}
          selectedSection={selectedSection}
          setProgressBarValue={setProgressBarValue}
          setSelectedSection={setSelectedSection}
          setProgressStep={setProgressStep}
          progressStep={progressStep}
          csrValue={csrValue}
          csrDetails={csrDetails}
          sections={orgData.sections}
        />
      </div>
    </div>
  );
};

export default CSR;
