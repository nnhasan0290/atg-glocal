import React from "react";
import { Button } from "baseui/button";

import UserService from "../../services/user.service";
import { alertCustom } from "../../helpers/alerts";
import { useDispatch } from "react-redux";
import { clearLoader, setLoader } from "../../store/actions/loader";
import BackArrow from "../../assets/Icons/back-arrow.svg";
import NextArrow from "../../assets/Icons/next-arrow.svg";

// export const Sections = [
//   {
//     id: "0",
//     imageUrl: LegalCompliances,
//     sectionText: "Legal Compliances",
//     identifier: "1",
//     questions: [
//       {
//         id: "0_0",
//         questionText: "Does your organization have Registration Certificate ?",
//         identifier: "1",
//         solutionOptions: [
//           {
//             solutionOptionText: "Yes",
//             identifier: 1,
//             selected: false,
//             marks: 3,
//             id: "0_0_0",
//           },
//           {
//             solutionOptionText: "Work In Progress",
//             identifier: 2,
//             selected: false,
//             marks: 2,
//             id: "0_0_1",
//           },
//           {
//             solutionOptionText: "No",
//             identifier: 3,
//             selected: false,
//             marks: 0,
//             id: "0_0_2",
//           },
//           {
//             solutionOptionText: "Don't Know",
//             identifier: 4,
//             selected: false,
//             marks: 0,
//             id: "0_0_3",
//           },
//         ],
//       },
//       {
//         questionText:
//           "Does your organization submit the Change Report to the Charity Commission? ",
//         identifier: "2",
//         solutionOptions: [
//           {
//             solutionOptionText: "Yes",
//             identifier: 1,
//             selected: false,
//             marks: 3,
//             id: "0_1_0",
//           },
//           {
//             solutionOptionText: "Work In Progress",
//             identifier: 2,
//             selected: false,
//             marks: 2,
//             id: "0_1_1",
//           },
//           {
//             solutionOptionText: "No",
//             identifier: 3,
//             selected: false,
//             marks: 0,
//             id: "0_1_2",
//           },
//           {
//             solutionOptionText: "Don't Know",
//             identifier: 4,
//             selected: false,
//             marks: 0,
//             id: "0_1_3",
//           },
//         ],
//         id: "0_1",
//       },
//       {
//         questionText:
//           "  Does your organzation submit Annual budget to the Charity Commission? ",
//         identifier: "3",
//         solutionOptions: [
//           {
//             solutionOptionText: "Yes",
//             identifier: 1,
//             selected: false,
//             marks: 3,
//             id: "0_2_0",
//           },
//           {
//             solutionOptionText: "Work In Progress",
//             identifier: 2,
//             selected: false,
//             marks: 2,
//             id: "0_2_1",
//           },
//           {
//             solutionOptionText: "No",
//             identifier: 3,
//             selected: false,
//             marks: 0,
//             id: "0_2_2",
//           },
//           {
//             solutionOptionText: "Don't Know",
//             identifier: 4,
//             selected: false,
//             marks: 0,
//             id: "0_2_3",
//           },
//         ],
//         id: "0_2",
//       },
//       {
//         questionText:
//           "Does your organization submit Annual Audit Report to the Charity Commission?",
//         identifier: "4",
//         solutionOptions: [
//           {
//             solutionOptionText: "Yes",
//             identifier: 1,
//             selected: false,
//             marks: 3,
//             id: "0_3_0",
//           },
//           {
//             solutionOptionText: "Work In Progress",
//             identifier: 2,
//             selected: false,
//             marks: 2,
//             id: "0_3_1",
//           },
//           {
//             solutionOptionText: "No",
//             identifier: 3,
//             selected: false,
//             marks: 0,
//             id: "0_3_2",
//           },
//           {
//             solutionOptionText: "Don't Know",
//             identifier: 4,
//             selected: false,
//             marks: 0,
//             id: "0_3_3",
//           },
//         ],
//         id: "0_3",
//       },
//     ],
//   },
//   {
//     id: "1",
//     imageUrl: IncomeText,
//     sectionText: "Income Tax",
//     identifier: "2",
//     questions: [
//       {
//         questionText:
//           "Has your organization conducted the Annual Audit for the past 3 years ?",
//         identifier: "1",
//         solutionOptions: [
//           {
//             solutionOptionText: "Yes",
//             identifier: 1,
//             selected: false,
//             marks: 3,
//             id: "1_0_0",
//           },
//           {
//             solutionOptionText: "Work In Progress",
//             identifier: 2,
//             selected: false,
//             marks: 2,
//             id: "1_0_1",
//           },
//           {
//             solutionOptionText: "No",
//             identifier: 3,
//             selected: false,
//             marks: 0,
//             id: "1_0_2",
//           },
//           {
//             solutionOptionText: "Don't Know",
//             identifier: 4,
//             selected: false,
//             marks: 0,
//             id: "1_0_3",
//           },
//         ],
//         id: "1_0",
//       },
//       {
//         questionText: "Does your organization have 12 A Certification?",
//         identifier: "2",
//         solutionOptions: [
//           {
//             solutionOptionText: "Yes",
//             identifier: 1,
//             selected: false,
//             marks: 3,
//             id: "1_1_0",
//           },
//           {
//             solutionOptionText: "Work In Progress",
//             identifier: 2,
//             selected: false,
//             marks: 2,
//             id: "1_1_1",
//           },
//           {
//             solutionOptionText: "No",
//             identifier: 3,
//             selected: false,
//             marks: 0,
//             id: "1_1_2",
//           },
//           {
//             solutionOptionText: "Don't Know",
//             identifier: 4,
//             selected: false,
//             marks: 0,
//             id: "1_1_3",
//           },
//         ],
//         id: "1_1",
//       },
//       {
//         questionText: "Does your organization have 80G Certification ?",
//         identifier: "3",
//         solutionOptions: [
//           {
//             solutionOptionText: "Yes",
//             identifier: 1,
//             selected: false,
//             marks: 3,
//             id: "1_2_0",
//           },
//           {
//             solutionOptionText: "Work In Progress",
//             identifier: 2,
//             selected: false,
//             marks: 2,
//             id: "1_2_1",
//           },
//           {
//             solutionOptionText: "No",
//             identifier: 3,
//             selected: false,
//             marks: 0,
//             id: "1_2_2",
//           },
//           {
//             solutionOptionText: "Don't Know",
//             identifier: 4,
//             selected: false,
//             marks: 0,
//             id: "1_2_3",
//           },
//         ],
//         id: "1_2",
//       },
//       {
//         questionText: "Does your organization have  FCRA Certification?",
//         identifier: "4",
//         solutionOptions: [
//           {
//             solutionOptionText: "Yes",
//             identifier: 1,
//             selected: false,
//             marks: 3,
//             id: "1_3_0",
//           },
//           {
//             solutionOptionText: "Work In Progress",
//             identifier: 2,
//             selected: false,
//             marks: 2,
//             id: "1_3_1",
//           },
//           {
//             solutionOptionText: "No",
//             identifier: 3,
//             selected: false,
//             marks: 0,
//             id: "1_3_2",
//           },
//           {
//             solutionOptionText: "Don't Know",
//             identifier: 4,
//             selected: false,
//             marks: 0,
//             id: "1_3_3",
//           },
//         ],
//         id: "1_3",
//       },
//     ],
//   },
//   {
//     id: "2",
//     sectionText: "External Communication",
//     imageUrl: EC,
//     identifier: "3",
//     questions: [
//       {
//         questionText:
//           "Does your organization have the Annual Reports for the past 3 years ?",
//         identifier: "1",
//         solutionOptions: [
//           {
//             solutionOptionText: "Yes",
//             identifier: 1,
//             selected: false,
//             marks: 3,
//             id: "2_0_0",
//           },
//           {
//             solutionOptionText: "Work In Progress",
//             identifier: 2,
//             selected: false,
//             marks: 2,
//             id: "2_0_1",
//           },
//           {
//             solutionOptionText: "No",
//             identifier: 3,
//             selected: false,
//             marks: 0,
//             id: "2_0_2",
//           },
//           {
//             solutionOptionText: "Don't Know",
//             identifier: 4,
//             selected: false,
//             marks: 0,
//             id: "2_0_3",
//           },
//         ],
//         id: "2_0",
//       },
//       {
//         questionText: "Does your organization have an official website?",
//         identifier: "2",
//         solutionOptions: [
//           {
//             solutionOptionText: "Yes",
//             identifier: 1,
//             selected: false,
//             marks: 3,
//             id: "2_1_0",
//           },
//           {
//             solutionOptionText: "Work In Progress",
//             identifier: 2,
//             selected: false,
//             marks: 2,
//             id: "2_1_1",
//           },
//           {
//             solutionOptionText: "No",
//             identifier: 3,
//             selected: false,
//             marks: 0,
//             id: "2_1_2",
//           },
//           {
//             solutionOptionText: "Don't Know",
//             identifier: 4,
//             selected: false,
//             marks: 0,
//             id: "2_1_3",
//           },
//         ],
//         id: "2_1",
//       },
//       {
//         questionText: "Is your organization active on Social media ?",
//         identifier: "3",
//         solutionOptions: [
//           {
//             solutionOptionText: "Yes",
//             identifier: 1,
//             selected: false,
//             marks: 3,
//             id: "2_2_0",
//           },
//           {
//             solutionOptionText: "Work In Progress",
//             identifier: 2,
//             selected: false,
//             marks: 2,
//             id: "2_2_1",
//           },
//           {
//             solutionOptionText: "No",
//             identifier: 3,
//             selected: false,
//             marks: 0,
//             id: "2_2_2",
//           },
//           {
//             solutionOptionText: "Don't Know",
//             identifier: 4,
//             selected: false,
//             marks: 0,
//             id: "2_2_3",
//           },
//         ],
//         id: "2_2",
//       },
//       {
//         questionText:
//           "Is your organization's Communication Material available with you? Eg: Brochure , Books etc",
//         identifier: "4",
//         solutionOptions: [
//           {
//             solutionOptionText: "Yes",
//             identifier: 1,
//             selected: false,
//             marks: 3,
//             id: "2_3_0",
//           },
//           {
//             solutionOptionText: "Work In Progress",
//             identifier: 2,
//             selected: false,
//             marks: 2,
//             id: "2_3_1",
//           },
//           {
//             solutionOptionText: "No",
//             identifier: 3,
//             selected: false,
//             marks: 0,
//             id: "2_3_2",
//           },
//           {
//             solutionOptionText: "Don't Know",
//             identifier: 4,
//             selected: false,
//             marks: 0,
//             id: "2_3_3",
//           },
//         ],
//         id: "2_3",
//       },
//     ],
//   },
//   {
//     id: "3",
//     imageUrl: OA,
//     sectionText: "Office Administration",
//     identifier: "4",
//     questions: [
//       {
//         questionText:
//           "Do you have Vision, Mission and Values of the organization available in written format ?",
//         identifier: "1",
//         solutionOptions: [
//           {
//             solutionOptionText: "Yes",
//             identifier: 1,
//             selected: false,
//             marks: 3,
//             id: "3_0_0",
//           },
//           {
//             solutionOptionText: "Work In Progress",
//             identifier: 2,
//             selected: false,
//             marks: 2,
//             id: "3_0_1",
//           },
//           {
//             solutionOptionText: "No",
//             identifier: 3,
//             selected: false,
//             marks: 0,
//             id: "3_0_2",
//           },
//           {
//             solutionOptionText: "Don't Know",
//             identifier: 4,
//             selected: false,
//             marks: 0,
//             id: "3_0_3",
//           },
//         ],
//         id: "3_0",
//       },
//       {
//         questionText:
//           "Are the Aims and Objectives of your organization in sync with its  Vision and  Mission ?",
//         identifier: "2",
//         solutionOptions: [
//           {
//             solutionOptionText: "Yes",
//             identifier: 1,
//             selected: false,
//             marks: 3,
//             id: "3_1_0",
//           },
//           {
//             solutionOptionText: "Work In Progress",
//             identifier: 2,
//             selected: false,
//             marks: 2,
//             id: "3_1_1",
//           },
//           {
//             solutionOptionText: "No",
//             identifier: 3,
//             selected: false,
//             marks: 0,
//             id: "3_1_2",
//           },
//           {
//             solutionOptionText: "Don't Know",
//             identifier: 4,
//             selected: false,
//             marks: 0,
//             id: "3_1_3",
//           },
//         ],
//         id: "3_1",
//       },
//       {
//         questionText:
//           "As per the organization's constitution, do you have Committee meetings?",
//         identifier: "3",
//         solutionOptions: [
//           {
//             solutionOptionText: "Yes",
//             identifier: 1,
//             selected: false,
//             marks: 3,
//             id: "3_2_0",
//           },
//           {
//             solutionOptionText: "Work In Progress",
//             identifier: 2,
//             selected: false,
//             marks: 2,
//             id: "3_2_1",
//           },
//           {
//             solutionOptionText: "No",
//             identifier: 3,
//             selected: false,
//             marks: 0,
//             id: "3_2_2",
//           },
//           {
//             solutionOptionText: "Don't Know",
//             identifier: 4,
//             selected: false,
//             marks: 0,
//             id: "3_2_3",
//           },
//         ],
//         id: "3_2",
//       },
//       {
//         questionText:
//           "Does providing direction to the organization, policy making , fund raising , public relations  management and other important decisions are taken collectively by the members of the organization ",
//         identifier: "4",
//         solutionOptions: [
//           {
//             solutionOptionText: "Yes",
//             identifier: 1,
//             selected: false,
//             marks: 3,
//             id: "3_3_0",
//           },
//           {
//             solutionOptionText: "Work In Progress",
//             identifier: 2,
//             selected: false,
//             marks: 2,
//             id: "3_3_1",
//           },
//           {
//             solutionOptionText: "No",
//             identifier: 3,
//             selected: false,
//             marks: 0,
//             id: "3_3_2",
//           },
//           {
//             solutionOptionText: "Don't Know",
//             identifier: 4,
//             selected: false,
//             marks: 0,
//             id: "3_3_3",
//           },
//         ],
//         id: "3_3",
//       },
//     ],
//   },
//   {
//     id: "4",
//     sectionText: "Human Resource Management",
//     identifier: "5",
//     imageUrl: HRM,
//     questions: [
//       {
//         questionText:
//           "Does your organization have Organisational Structure in written format ?",
//         identifier: "1",
//         solutionOptions: [
//           {
//             solutionOptionText: "Yes",
//             identifier: 1,
//             selected: false,
//             marks: 3,
//             id: "4_0_0",
//           },
//           {
//             solutionOptionText: "Work In Progress",
//             identifier: 2,
//             selected: false,
//             marks: 2,
//             id: "4_0_1",
//           },
//           {
//             solutionOptionText: "No",
//             identifier: 3,
//             selected: false,
//             marks: 0,
//             id: "4_0_2",
//           },
//           {
//             solutionOptionText: "Don't Know",
//             identifier: 4,
//             selected: false,
//             marks: 0,
//             id: "4_0_3",
//           },
//         ],
//         id: "4_0",
//       },
//       {
//         questionText:
//           "Are the Roles and Responsibilities of the employees of the organization in written format ?",
//         identifier: "2",
//         solutionOptions: [
//           {
//             solutionOptionText: "Yes",
//             identifier: 1,
//             selected: false,
//             marks: 3,
//             id: "4_1_0",
//           },
//           {
//             solutionOptionText: "Work In Progress",
//             identifier: 2,
//             selected: false,
//             marks: 2,
//             id: "4_1_1",
//           },
//           {
//             solutionOptionText: "No",
//             identifier: 3,
//             selected: false,
//             marks: 0,
//             id: "4_1_2",
//           },
//           {
//             solutionOptionText: "Don't Know",
//             identifier: 4,
//             selected: false,
//             marks: 0,
//             id: "4_1_3",
//           },
//         ],
//         id: "4_1",
//       },
//       {
//         questionText:
//           "Does your organization have an HR manual for its employees ? ",
//         identifier: "3",
//         solutionOptions: [
//           {
//             solutionOptionText: "Yes",
//             identifier: 1,
//             selected: false,
//             marks: 3,
//             id: "4_2_0",
//           },
//           {
//             solutionOptionText: "Work In Progress",
//             identifier: 2,
//             selected: false,
//             marks: 2,
//             id: "4_2_1",
//           },
//           {
//             solutionOptionText: "No",
//             identifier: 3,
//             selected: false,
//             marks: 0,
//             id: "4_2_2",
//           },
//           {
//             solutionOptionText: "Don't Know",
//             identifier: 4,
//             selected: false,
//             marks: 0,
//             id: "4_2_3",
//           },
//         ],
//         id: "4_2",
//       },
//       {
//         questionText:
//           "Is there an Appraisal System for Employees of the organization ?",
//         identifier: "4",
//         solutionOptions: [
//           {
//             solutionOptionText: "Yes",
//             identifier: 1,
//             selected: false,
//             marks: 3,
//             id: "4_3_0",
//           },
//           {
//             solutionOptionText: "Work In Progress",
//             identifier: 2,
//             selected: false,
//             marks: 2,
//             id: "4_3_1",
//           },
//           {
//             solutionOptionText: "No",
//             identifier: 3,
//             selected: false,
//             marks: 0,
//             id: "4_3_2",
//           },
//           {
//             solutionOptionText: "Don't Know",
//             identifier: 4,
//             selected: false,
//             marks: 0,
//             id: "4_3_3",
//           },
//         ],
//         id: "4_3",
//       },
//     ],
//   },
//   {
//     id: "5",
//     sectionText: "Financial Management",
//     identifier: "6",
//     imageUrl: FM,
//     questions: [
//       {
//         questionText:
//           "Does your organization have an Accounting system in place ?",
//         identifier: "1",
//         solutionOptions: [
//           {
//             solutionOptionText: "Yes",
//             identifier: 1,
//             selected: false,
//             marks: 3,
//             id: "5_0_0",
//           },
//           {
//             solutionOptionText: "Work In Progress",
//             identifier: 2,
//             selected: false,
//             marks: 2,
//             id: "5_0_1",
//           },
//           {
//             solutionOptionText: "No",
//             identifier: 3,
//             selected: false,
//             marks: 0,
//             id: "5_0_2",
//           },
//           {
//             solutionOptionText: "Don't Know",
//             identifier: 4,
//             selected: false,
//             marks: 0,
//             id: "5_0_3",
//           },
//         ],
//         id: "5_0",
//       },
//       {
//         questionText:
//           "Has your organization conducted the Annual Audit for the past 3 years ?",
//         identifier: "2",
//         solutionOptions: [
//           {
//             solutionOptionText: "Yes",
//             identifier: 1,
//             selected: false,
//             marks: 3,
//             id: "5_1_0",
//           },
//           {
//             solutionOptionText: "Work In Progress",
//             identifier: 2,
//             selected: false,
//             marks: 2,
//             id: "5_1_1",
//           },
//           {
//             solutionOptionText: "No",
//             identifier: 3,
//             selected: false,
//             marks: 0,
//             id: "5_1_2",
//           },
//           {
//             solutionOptionText: "Don't Know",
//             identifier: 4,
//             selected: false,
//             marks: 0,
//             id: "5_1_3",
//           },
//         ],
//         id: "5_1",
//       },
//       {
//         questionText:
//           "Does the organization have a Financial Policy in written format?",
//         identifier: "3",
//         solutionOptions: [
//           {
//             solutionOptionText: "Yes",
//             identifier: 1,
//             selected: false,
//             marks: 3,
//             id: "5_2_0",
//           },
//           {
//             solutionOptionText: "Work In Progress",
//             identifier: 2,
//             selected: false,
//             marks: 2,
//             id: "5_2_1",
//           },
//           {
//             solutionOptionText: "No",
//             identifier: 3,
//             selected: false,
//             marks: 0,
//             id: "5_2_2",
//           },
//           {
//             solutionOptionText: "Don't Know",
//             identifier: 4,
//             selected: false,
//             marks: 0,
//             id: "5_2_3",
//           },
//         ],
//         id: "5_2",
//       },
//       {
//         questionText:
//           "Has your organization conducted the Annual Audit by a registered Auditor ?",
//         identifier: "4",
//         solutionOptions: [
//           {
//             solutionOptionText: "Yes",
//             identifier: 1,
//             selected: false,
//             marks: 3,
//             id: "5_3_0",
//           },
//           {
//             solutionOptionText: "Work In Progress",
//             identifier: 2,
//             selected: false,
//             marks: 2,
//             id: "5_3_1",
//           },
//           {
//             solutionOptionText: "No",
//             identifier: 3,
//             selected: false,
//             marks: 0,
//             id: "5_3_2",
//           },
//           {
//             solutionOptionText: "Don't Know",
//             identifier: 4,
//             selected: false,
//             marks: 0,
//             id: "5_3_3",
//           },
//         ],
//         id: "5_3",
//       },
//     ],
//   },
//   {
//     id: "6",
//     sectionText: "Fundraising Management",
//     imageUrl: FUM,
//     identifier: "7",
//     questions: [
//       {
//         questionText: "Do you operate the organization by your own funds ?",
//         identifier: "1",
//         solutionOptions: [
//           {
//             solutionOptionText: "Yes",
//             identifier: 1,
//             selected: false,
//             marks: 3,
//             id: "6_0_0",
//           },
//           {
//             solutionOptionText: "Work In Progress",
//             identifier: 2,
//             selected: false,
//             marks: 2,
//             id: "6_0_1",
//           },
//           {
//             solutionOptionText: "No",
//             identifier: 3,
//             selected: false,
//             marks: 0,
//             id: "6_0_2",
//           },
//           {
//             solutionOptionText: "Don't Know",
//             identifier: 4,
//             selected: false,
//             marks: 0,
//             id: "6_0_3",
//           },
//         ],
//         id: "6_0",
//       },
//       {
//         questionText:
//           "Does the organizataion raise funds through the CSR funds / Government sources ?",
//         identifier: "2",
//         solutionOptions: [
//           {
//             solutionOptionText: "Yes",
//             identifier: 1,
//             selected: false,
//             marks: 3,
//             id: "6_1_0",
//           },
//           {
//             solutionOptionText: "Work In Progress",
//             identifier: 2,
//             selected: false,
//             marks: 2,
//             id: "6_1_1",
//           },
//           {
//             solutionOptionText: "No",
//             identifier: 3,
//             selected: false,
//             marks: 0,
//             id: "6_1_2",
//           },
//           {
//             solutionOptionText: "Don't Know",
//             identifier: 4,
//             selected: false,
//             marks: 0,
//             id: "6_1_3",
//           },
//         ],
//         id: "6_1",
//       },
//       {
//         questionText:
//           "Does your organization have a Project Proposal which is mandatory for Fundraising ?",
//         identifier: "3",
//         solutionOptions: [
//           {
//             solutionOptionText: "Yes",
//             identifier: 1,
//             selected: false,
//             marks: 3,
//             id: "6_2_0",
//           },
//           {
//             solutionOptionText: "Work In Progress",
//             identifier: 2,
//             selected: false,
//             marks: 2,
//             id: "6_2_1",
//           },
//           {
//             solutionOptionText: "No",
//             identifier: 3,
//             selected: false,
//             marks: 0,
//             id: "6_2_2",
//           },
//           {
//             solutionOptionText: "Don't Know",
//             identifier: 4,
//             selected: false,
//             marks: 0,
//             id: "6_2_3",
//           },
//         ],
//         id: "6_2",
//       },
//       {
//         questionText: "Have you appointed a special person for raising funds?",
//         identifier: "4",
//         solutionOptions: [
//           {
//             solutionOptionText: "Yes",
//             identifier: 1,
//             selected: false,
//             marks: 3,
//             id: "6_3_0",
//           },
//           {
//             solutionOptionText: "Work In Progress",
//             identifier: 2,
//             selected: false,
//             marks: 2,
//             id: "6_3_1",
//           },
//           {
//             solutionOptionText: "No",
//             identifier: 3,
//             selected: false,
//             marks: 0,
//             id: "6_3_2",
//           },
//           {
//             solutionOptionText: "Don't Know",
//             identifier: 4,
//             selected: false,
//             marks: 0,
//             id: "6_3_3",
//           },
//         ],
//         id: "6_3",
//       },
//     ],
//   },
//   {
//     id: "7",
//     sectionText: "Information System",
//     imageUrl: IS,
//     identifier: "8",
//     questions: [
//       {
//         questionText: "Does your organization have Data Collection tools  ?",
//         identifier: "1",
//         solutionOptions: [
//           {
//             solutionOptionText: "Yes",
//             identifier: 1,
//             selected: false,
//             marks: 3,
//             id: "7_0_0",
//           },
//           {
//             solutionOptionText: "Work In Progress",
//             identifier: 2,
//             selected: false,
//             marks: 2,
//             id: "7_0_1",
//           },
//           {
//             solutionOptionText: "No",
//             identifier: 3,
//             selected: false,
//             marks: 0,
//             id: "7_0_2",
//           },
//           {
//             solutionOptionText: "Don't Know",
//             identifier: 4,
//             selected: false,
//             marks: 0,
//             id: "7_0_3",
//           },
//         ],
//         id: "7_0",
//       },
//       {
//         questionText:
//           "Does your organization maintain reports after the collection of Project Data?",
//         identifier: "2",
//         solutionOptions: [
//           {
//             solutionOptionText: "Yes",
//             identifier: 1,
//             selected: false,
//             marks: 3,
//             id: "7_1_0",
//           },
//           {
//             solutionOptionText: "Work In Progress",
//             identifier: 2,
//             selected: false,
//             marks: 2,
//             id: "7_1_1",
//           },
//           {
//             solutionOptionText: "No",
//             identifier: 3,
//             selected: false,
//             marks: 0,
//             id: "7_1_2",
//           },
//           {
//             solutionOptionText: "Don't Know",
//             identifier: 4,
//             selected: false,
//             marks: 0,
//             id: "7_1_3",
//           },
//         ],
//         id: "7_1",
//       },
//       {
//         questionText:
//           "Do you use Excel systems for collecting the  Project's Data?",
//         identifier: "3",
//         solutionOptions: [
//           {
//             solutionOptionText: "Yes",
//             identifier: 1,
//             selected: false,
//             marks: 3,
//             id: "7_2_0",
//           },
//           {
//             solutionOptionText: "Work In Progress",
//             identifier: 2,
//             selected: false,
//             marks: 2,
//             id: "7_2_1",
//           },
//           {
//             solutionOptionText: "No",
//             identifier: 3,
//             selected: false,
//             marks: 0,
//             id: "7_2_2",
//           },
//           {
//             solutionOptionText: "Don't Know",
//             identifier: 4,
//             selected: false,
//             marks: 0,
//             id: "7_2_3",
//           },
//         ],
//         id: "7_2",
//       },
//       {
//         questionText:
//           "Do you take the decisions of your organization based on data ?",
//         identifier: "4",
//         solutionOptions: [
//           {
//             solutionOptionText: "Yes",
//             identifier: 1,
//             selected: false,
//             marks: 3,
//             id: "7_3_0",
//           },
//           {
//             solutionOptionText: "Work In Progress",
//             identifier: 2,
//             selected: false,
//             marks: 2,
//             id: "7_3_1",
//           },
//           {
//             solutionOptionText: "No",
//             identifier: 3,
//             selected: false,
//             marks: 0,
//             id: "7_3_2",
//           },
//           {
//             solutionOptionText: "Don't Know",
//             identifier: 4,
//             selected: false,
//             marks: 0,
//             id: "7_3_3",
//           },
//         ],
//         id: "7_3",
//       },
//     ],
//   },
// ];
const scrollToTop = () => {
  window.scrollTo(0, 0);
};

function Footer(props) {
  const dispatch = useDispatch();

  const {
    selectedSection,
    setProgressBarValue,
    setSelectedSection,
    progressBarValue,
    setProgressStep,
    csrValue,
    csrDetails,
    sections,
  } = props;

  function handeleSubmit() {
    dispatch(setLoader());
    const DataMaster = sections;
    console.log(csrValue);

    csrValue.forEach((value, key) => {
      // eslint-disable-next-line
      DataMaster.map((section) => {
        // eslint-disable-next-line
        section.questions.map((question) => {
          if (question.identifier === key) {
            question.solutionOptions[value - 1].selected = true;
            // eslint-disable-next-line
            // question.solutionOptions.map((solutionOption) => {
            //   if (solutionOption.identifier.toString() === value) {
            //     solutionOption.selected = true;
            //   }
            // });
          }
        });
      });
    });

    console.log(DataMaster);
    const data = {
      organisationName: csrDetails.organisationName,
      thematicAreaList: csrDetails.thematicAreaList,
      sections: DataMaster,
    };

    UserService.submitCsrTest(data)
      .then((res) => {
        dispatch(clearLoader());
        if (res.data.status === 1) {
          alertCustom(
            "success",
            "Test Submitted Successfully ! We have mailed the analysis report on your registered email id",
            "/home"
          );
        } else {
          alertCustom("error", res.data.message, "/home");
        }
      })
      .catch((error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        alertCustom("error", message, "/home");
      });
  }
  function getLatQue() {
    if (csrValue.get(selectedSection.questions[3].identifier)) {
      return true;
    }
  }
  return (
    <div className='flex justify-around rounded pb-8'>
      <Button
        disabled={
          selectedSection.identifier === "1ed03f58-2e99-4efa-9f66-c03d7fc507e5"
            ? true
            : false
        }
        onClick={() => {
          let index = (progressBarValue * 2) / 25;

          scrollToTop();
          setProgressBarValue((prev) => prev - 12.5);
          setSelectedSection(sections[index - 2]);
          setProgressStep(0);
        }}
        overrides={{
          BaseButton: {
            style: ({ $theme }) => ({
              backgroundColor: $theme.colors.accent,
            }),
          },
        }}
        className='rounded  py-2 px-4'
      >
        <img src={BackArrow} width='10' alt='Back Arrow' />
      </Button>

      <Button
        disabled={
          csrValue.get("f1af2084-f63c-4ae0-bc81-b45d02fddb34") ? false : true // last section identifier
        }
        onClick={handeleSubmit}
        overrides={{
          BaseButton: {
            style: ({ $theme }) => ({
              backgroundColor: $theme.colors.accent,
            }),
          },
        }}
        className='text-white font-bold py-2 px-4 rounded'
      >
        Submit
      </Button>

      <Button
        disabled={
          selectedSection.identifier ===
            "1be82d1d-a785-48d1-b49d-41eefd976574" || !getLatQue()
            ? true
            : false
        }
        onClick={() => {
          let index = (progressBarValue * 2) / 25;

          scrollToTop();
          setProgressBarValue((prev) => prev + 12.5);
          setSelectedSection(sections[index]);

          setProgressStep(0);
        }}
        overrides={{
          BaseButton: {
            style: ({ $theme }) => ({
              backgroundColor: $theme.colors.accent,
            }),
          },
        }}
        className='text-white font-bold py-2 px-4 rounded'
      >
        {" "}
        <img src={NextArrow} width='10' alt='Next Arrow' />
      </Button>
    </div>
  );
}

export default Footer;
