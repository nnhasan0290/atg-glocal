import LegalCompliances from "../assets/Icons/Legal Compliances.svg";
import IncomeText from "../assets/Icons/Income-tax.svg";
import EC from "../assets/Icons/externnal-commu.svg";
import OA from "../assets/Icons/Office-Admin.svg";
import HRM from "../assets/Icons/HRM.svg";
import FM from "../assets/Icons/Financial-mgt.svg";
import FUM from "../assets/Icons/frm.svg";
import IS from "../assets/Icons/IS.svg";

export const POLLING_INTERVAL = 300000;
export const S3_CONFIG_WORKSHOP = {
  bucketName: "poster-images-glocalbodh",
  dirName: "workshop" /* optional */,
  region: "ap-south-1",
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY,
};
export const S3_CONFIG_AWARDS = {
  bucketName: "poster-images-glocalbodh",
  dirName: "awards" /* optional */,
  region: "ap-south-1",
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY,
};

export const S3_CONFIG_EXHIBITION = {
  bucketName: "poster-images-glocalbodh",
  dirName: "exhibition" /* optional */,
  region: "ap-south-1",
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY,
};

export const THEMATIC_AREA = [
  "Aged/Elderly",
  "Agriculture Management",
  "Animal Husbandry, Dairying & Fisheries",
  "Art & Culture",
  "Biotechnology",
  "Child Development",
  "Civic Issues",
  "Differently Abled",
  "Disaster Managaement",
  "Drinking Water & Water Resources Management",
  "Education & Literacy",
  "Environment",
  "Eradication of the Hunger Issue",
  "Health & Family Welfare",
  "Human Rights",
  "Labour & Employment",
  "Legal Awareness & Aid",
  "Livelihood and Skill Development",
  "Micro Small & Medium Enterprises",
  "Minority Issues",
  "Nutrition",
  "Panchayati Raj",
  "Renewable Energy",
  "Right to Information",
  "Rural Development",
  "Sanitation",
  "Science & Technology",
  "Solid Waste Management",
  "Sports",
  "Tribal Development",
  "Urban Development & Poverty Alleviation",
  "Vocatitional Training",
  "Women Empowerment",
  "Youth Development",
];

export const GENDER = ["Male", "Female", "LGBTQ+"];

export const CSR = [
  "Legal Compliances",
  "Income Tax",
  "External Communication",
  "Office Administration",
  "Human Resource Management",
  "Financial Management",
  "Fundraising Management",
  "Information System",
];

export const QUESTIONS = [
  [
    "Does your organization have Registration Certificate ?",
    "Does your organization submit CSR form 1?",
  ],
  [
    "Does your organization have valid 12 A Certification?",
    "Does your organization have valid 80G Certification ?",
  ],
  [
    "Does your organization have the Annual Reports for the past 3 years ?",
    "Does your organization have an official website?",
  ],
  [
    "Do you have Vision, Mission and Values of the organization available in written format ?",
    "As per the organization's constitution, do you have Committee meetings?",
  ],
  [
    "Does your organization have Organisational Structure in written format ?",
    "Does your organization have an HR policy for its employees ? ",
  ],
  [
    "Has your organization conducted the Annual Audit for the past 3 years ?",
    "Does the organization have a Financial Policy in written format?",
  ],
  [
    "Does the organizataion raise funds through the CSR funds / Government sources ?",
    "Do you develop your own Project Proposals internally ?",
  ],
  [
    "Do you provide project completion reports to funders?",
    "Do you take the decisions of your organization based on data ?",
  ],
];

export const CSR_IMAGE = {
  "Legal Compliances": LegalCompliances,
  "Income Tax": IncomeText,
  "External Communication": EC,
  "Office Administration": OA,
  "Human Resource Management": HRM,
  "Financial Management": FM,
  "Fundraising Management": FUM,
  "Information System": IS,
};
