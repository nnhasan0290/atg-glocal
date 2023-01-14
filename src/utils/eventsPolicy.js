import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const PostingPolicy = () => {
  return (
    <div className='col-sm-8 justify-content-around'>
      <ul style={{ listStyleType: "disc" }}>
        <li>
          Events: (All)
          <ul style={{ listStyleType: "disc" }}>
            <li>
              You agree not to misuse any data uploaded for target audience and
              You Guarantee the data/hyperlinks/SPOC detail provided by You
              is/are authorized by registered entity
            </li>
            <li>
              You agree not to misuse the platform by using competitor service
              provider hyperlinks for any post. All posts on our platform under
              detailed scrutiny. Action will be taken against any post with
              similar attempts are identified and will be removed from the
              platform without any prior notice
            </li>
            <li>
              You adhere to all company{" "}
              <strong>
                <a href='/privacyPolicy' target='_blank'>
                  Privacy Policy
                </a>
              </strong>{" "}
              and{" "}
              <strong>
                <a href='/terms' target='_blank'>
                  Terms and Conditions
                </a>
              </strong>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};
export default PostingPolicy;
