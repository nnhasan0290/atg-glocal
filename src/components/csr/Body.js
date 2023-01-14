import React from "react";
import { RadioGroup, Radio, ALIGN } from "baseui/radio";
import { Button, SHAPE, KIND, SIZE } from "baseui/button";
import { ProgressSteps, NumberedStep } from "baseui/progress-steps";

const options = {
  1: "Yes",
  2: "Work In Progress",
  3: "No",
  4: "Don't Know",
};

function SpacedButton(props) {
  return (
    <Button
      {...props}
      shape={SHAPE.pill}
      kind={KIND.secondary}
      size={SIZE.compact}
      overrides={{
        BaseButton: {
          style: ({ $theme }) => ({
            marginLeft: $theme.sizing.scale200,
            marginRight: $theme.sizing.scale200,
            marginTop: $theme.sizing.scale800,
          }),
        },
      }}
    />
  );
}

function Body(props) {
  const {
    progressStep,
    selectedSection,
    csrValue,
    setProgressStep,
    setCsrValue,
  } = props;
  return (
    <div className='flex justify-start p-3'>
      <ProgressSteps
        current={progressStep}
        overrides={{
          Icon: {
            style: ({ $theme, $isActive, $isCompleted }) => ({
              backgroundColor: $isActive
                ? $theme.colors.accent
                : $isCompleted
                ? $theme.colors.accent
                : $theme.colors.accent50,
            }),
          },
          Tail: {
            style: ({ $theme }) => ({
              backgroundColor: $theme.colors.accent,
            }),
          },
          InnerIcon: {
            style: ({ $theme }) => ({
              backgroundColor: $theme.colors.accent100,
            }),
          },
        }}
      >
        {selectedSection.questions.map((question) => {
          return (
            <NumberedStep
              title={`${question.questionText} ${
                csrValue.get(question.identifier)
                  ? `(${options[csrValue.get(question.identifier)]})`
                  : ""
              } `}
              key={question.identifier}
            >
              <div className='ml-8'>
                <RadioGroup
                  value={csrValue.get(question.identifier)}
                  onChange={(e) => {
                    setCsrValue(
                      (prev) =>
                        new Map([
                          ...prev,
                          [e.target.dataset.id, e.target.value],
                        ])
                    );
                  }}
                  name={selectedSection.sectionText}
                  align={ALIGN.vertical}
                  labelPlacement='left'
                  overrides={{
                    Input: {
                      props: {
                        "data-id": question.identifier,
                      },
                    },
                    RadioMarkInner: {
                      style: ({ $theme, $checked }) => ({
                        position: "absolute",
                        right: "5%",
                        backgroundColor: $checked
                          ? $theme.colors.accent
                          : $theme.colors.accent50,
                      }),
                    },
                    RadioMarkOuter: {
                      style: ({ $theme, $checked }) => ({
                        position: "absolute",
                        right: "5%",
                        backgroundColor: $checked
                          ? $theme.colors.accent
                          : $theme.colors.accent50,
                      }),
                    },
                  }}
                >
                  <Radio value='1'>Yes</Radio>
                  <Radio value='2'>Work in Progress</Radio>
                  <Radio value='3'>No</Radio>
                  <Radio value='4'>Don't Know</Radio>
                </RadioGroup>

                <SpacedButton
                  disabled={progressStep === 0 ? true : false}
                  onClick={() => setProgressStep((prev) => prev - 1)}
                >
                  Previous
                </SpacedButton>
                <SpacedButton
                  disabled={
                    csrValue.get(question.identifier) && progressStep !== 3
                      ? false
                      : true
                  }
                  onClick={() => {
                    setProgressStep((prev) => prev + 1);
                  }}
                >
                  Next
                </SpacedButton>
              </div>
            </NumberedStep>
          );
        })}
      </ProgressSteps>
    </div>
  );
}

export default Body;
