import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const PostingPolicy = () => {
  return (
    <div className='col-sm-8 justify-content-around'>
      <ul style={{ listStyleType: "disc" }}>
        <li>
          Jobs:&nbsp;
          <ul style={{ listStyleType: "disc" }}>
            <li>
              You agree to utilize data/documents/information provided by all
              applicants adhering companies{" "}
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
            <li>
              You agree that You and only You are solely responsible in case of
              any inaccurate/illegal/unethical/ usage or any kind of such
              malpractice is identified of applicant data/documents/information
              over this post
            </li>
            <li>
              You agree not to misuse any data uploaded for target audience and
              You Guarantee the data/hyperlinks/SPOC detail provided by You
              is/are authorized by registered entity
            </li>
            <li>
              You agree not to misuse the platform by using competitor service
              provider hyperlinks for any post leading to{" "}
              <strong>misuse of company leads</strong>. All posts on our
              platform under detailed scrutiny. Action will be taken against any
              post with similar attempts are identified and will be removed from
              the platform without any prior notice
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};
export default PostingPolicy;
