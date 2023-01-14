import * as Yup from "yup";
// const URL_MATCH =
//   /((https?):\/\/)?(www.)?[a-z0-9-]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#-]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;
// const phoneRegExp =
//   /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
// const YOUTUBE_REGEX =
//   "/^(?:https?:\\/\\/)?(?:www\\.)?(?:youtu\\.be\\/|youtube\\.com\\/(?:embed\\/|v\\/|watch\\?v=|watch\\?.+&v=))((\\w|-){11})(?:\\S+)?$/";

export const validationSchemaLogin = Yup.object().shape({
  email: Yup.string()
    .max(255, "Maximum 255 character")
    .email("Invalid email format")
    .required("Required"),
  password: Yup.string()
    .min(6, "Must be 6 characters or more")
    .max(255, "Maximum 255 character")
    .required("required"),
  contact: Yup.string()
    .max(10, "Maximum 10 character")
    .typeError("Number Only"),
});
export const validationSchemaReviewJob = Yup.object().shape({
  // employerLink: Yup.string().when("approve", (value) => {
  //   if (value === "approve") {
  //     return Yup.string().required("This is required");
  //   } else {
  //     return Yup.mixed().notRequired();
  //   }
  // }),
  // applicantLink: Yup.string().when("approve", (value) => {
  //   if (value === "approve") {
  //     return Yup.string().required("This is required");
  //   } else {
  //     return Yup.mixed().notRequired();
  //   }
  // }),
  approve: Yup.string().required("This is requred"),
  reasonText: Yup.string().when("approve", (value) => {
    if (value === "disapprove") {
      return Yup.string().required("This is required");
    } else {
      return Yup.mixed().notRequired();
    }
  }),
});
export const validationSchemaReset = Yup.object().shape({
  newPassword: Yup.string()
    .min(6, "Must be 6 characters or more")
    .max(255, "Maximum 255 character")
    .required("required"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("newPassword"), null],
    "Passwords must match"
  ),
});
export const validationSchemaForgotPassword = Yup.object().shape({
  email: Yup.string()
    .max(255, "Maximum 255 character")
    .email("Invalid email format")
    .required("Required"),
});
export const validationSchemaRegister = Yup.object().shape({
  username: Yup.string().max(40, "Maximum 40 character").required("Required"),
  email: Yup.string()
    .max(255, "Maximum 255 character")
    .email("Invalid email format")
    .required("Required"),
  password: Yup.string()
    .min(6, "Must be 6 characters or more")
    .max(255, "Maximum 255 character")
    .required("required"),
  contact: Yup.number().typeError("Number Only").required("This is required"),
});

export const validationSchemaRFP = Yup.object().shape({
  eventTitle: Yup.string()
    .max(80, "Must be 80 characters or less")
    .required("Event Title is required"),
  description: Yup.string()
    .max(5000, "Must be 5000 characters or less")
    .required("About Event is required"),
  thematicArea: Yup.string()
    .max(5000, "Must be 5000 characters or less")
    .required("This is is required"),

  applicationDeadline: Yup.string().required("Please select Deadline Date"),
  eventLink: Yup.string()
    .max(255, "Must be 255 characters or less")
    .required("This is required"),
  terms: Yup.bool().oneOf([true], "Accept Terms & Conditions is required"),
  postedBy: Yup.string()
    .max(255, "Must be 255 characters or less")
    .required("This is required"),
  eventType: Yup.string().required("This is required"),
  location: Yup.string().when("eventType", (value) => {
    if (value === "Offline") {
      return Yup.string().required("This is required");
    } else {
      return Yup.mixed().notRequired();
    }
  }),
});
export const validationSchemaAwardEvent = Yup.object().shape({
  eventTitle: Yup.string()
    .max(160, "Must be 160 characters or less")
    .required("Event Title is required"),
  organisedBy: Yup.string()
    .max(60, "Must be 60 characters or less")
    .required("Organisation Name is required"),

  videoLink: Yup.string(),
  description: Yup.string()
    .max(5000, "Must be 5000 characters or less")
    .required("About Event is required"),
  eligibilityCriteria: Yup.string()
    .max(5000, "Must be 5000 characters or less")
    .required("Eligibilty is required"),
  eventTime: Yup.string().required("Please select date and time"),

  //totalSeats: Yup.number().typeError("you must specify a number"),
  applicationDeadline: Yup.string().required("Please select Deadline Date"),
  eventLink: Yup.string()
    .max(255, "Must be 255 characters or less")
    .required("This is required"),
  terms: Yup.bool().oneOf([true], "Accept Terms & Conditions is required"),
  postedBy: Yup.string()
    .max(255, "Must be 255 characters or less")
    .required("This is required"),
  eventType: Yup.string().required("This is required"),
  venue: Yup.string().when("eventType", (value) => {
    if (value === "Offline") {
      return Yup.string().required("This is required");
    } else {
      return Yup.mixed().notRequired();
    }
  }),
});
export const validationSchemaExhibitionEvent = Yup.object().shape({
  eventTitle: Yup.string()
    .max(160, "Must be 160 characters or less")
    .required("Event Title is required"),
  organisedBy: Yup.string()
    .max(60, "Must be 60 characters or less")
    .required("Organisation Name is required"),
  description: Yup.string()
    .max(5000, "Must be 5000 characters or less")
    .required("About Event is required"),

  videoLink: Yup.string(),

  eventTime: Yup.string().required("Please select date and time"),

  fees: Yup.number()
    .required("This is required")
    .typeError("You must specify a Number. If No Fees Enter 0 in field"),

  applicationDeadline: Yup.string().required("Please select Deadline Date"),
  eventLink: Yup.string()
    .max(255, "Must be 255 characters or less")
    .required("This is required"),
  terms: Yup.bool().oneOf([true], "Accept Terms & Conditions is required"),
  postedBy: Yup.string()
    .max(255, "Must be 255 characters or less")
    .required("This is required"),
  eventType: Yup.string().required("This is required"),
  venue: Yup.string().when("eventType", (value) => {
    if (value === "Offline") {
      return Yup.string().required("This is required");
    } else {
      return Yup.mixed().notRequired();
    }
  }),
});
export const validationSchemaFundingUpdate = Yup.object().shape({
  eventTitle: Yup.string()
    .max(80, "Must be 80 characters or less")
    .required("Event Title is required"),
  description: Yup.string()
    .max(5000, "Must be 5000 characters or less")
    .required("About Event is required"),
  applicationDeadline: Yup.string().required("Please select Deadline Date"),
  terms: Yup.bool().oneOf([true], "Accept Terms & Conditions is required"),
  postedBy: Yup.string()
    .max(255, "Must be 255 characters or less")
    .required("This is required"),
  category: Yup.string()
    .max(500, "Must be 500 characters or less")
    .required("This is required"),

  minAge: Yup.number()
    .required("This is required")
    .typeError("You must specify a Number"),
  maxAge: Yup.number()
    .required("This is required")
    .typeError("You must specify a Number"),
});
export const validationSchemaWorkshopEvent = Yup.object().shape({
  eventTitle: Yup.string()
    .max(160, "Must be 160 characters or less")
    .required("Event Title is required"),
  organisedBy: Yup.string()
    .max(60, "Must be 60 characters or less")
    .required(" Name is required"),
  description: Yup.string()
    .max(5000, "Must be 255 characters or less")
    .required("About Event is required"),

  videoLink: Yup.string(),
  topicsCovered: Yup.string()
    .max(5000, "Must be 5000 characters or less")
    .required("Eligibilty is required"),
  eventTime: Yup.string().required("Please select date and time"),

  fees: Yup.number()
    .required("This is required")
    .typeError("You must specify a Number. If No Fees Enter 0 in field"),

  totalSeats: Yup.number()
    .required("This is required")
    .typeError("You must specify a Number. If No Seats Enter 0 in field"),

  applicationDeadline: Yup.string().required("Please select Deadline Date"),
  eventLink: Yup.string()
    .max(255, "Must be 255 characters or less")
    .required("This is required"),
  terms: Yup.bool().oneOf([true], "Accept Terms & Conditions is required"),
  postedBy: Yup.string()
    .max(255, "Must be 255 characters or less")
    .required("This is required"),
  eventType: Yup.string().required("This is required"),
  venue: Yup.string().when("eventType", (value) => {
    if (value === "Offline") {
      return Yup.string().required("This is required");
    } else {
      return Yup.mixed().notRequired();
    }
  }),
});

export const validationSchemaWorkshopRegister = Yup.object().shape({
  name: Yup.string().required("Name of the buyer is required"),
  contactNumber: Yup.number().required("This is Required"),
  email: Yup.string().required("email is required"),
  organizationName: Yup.string().required("Name is required"),
  cityId: Yup.string().required("This is required"),
});

export const validationSchemaJob = Yup.object().shape({
  designation: Yup.string()
    .max(65, "Maximum 65 charcters")
    .required("Job Title is required"),
  jobDescription: Yup.string()
    .max(5000, "Maximum 5000 charcters")
    .required("This is required"),
  requirements: Yup.string()
    .max(5000, "Maximum 5000 charcters")
    .required("This is required"),
  jobType: Yup.string().required("This is required"),
  expiryDate: Yup.date().required("This is required"),
  orgName: Yup.string()
    .max(255, "Maximum 255 charcters")
    .required("This is required"),
  aboutOrg: Yup.string()
    .max(5000, "Maximum 5000 charcters")
    .required("This is required"),
  location: Yup.string()
    .max(255, "Maximum 255 charcters")
    .required("This is required"),
  orgAddress: Yup.string()
    .max(255, "Maximum 255 charcters")
    .required("This is required"),
  // externalLink: Yup.string().required("This is required"),
  expYears: Yup.number()
    .typeError("you must specify a number")
    .required("This is Required"),
  salaryType: Yup.string().required("You must select salry type"),
  fixedSalary: Yup.string().when("salaryType", (value) => {
    if (value === "fixed") {
      return Yup.number()
        .typeError("Number please")

        .required("This is required");
    } else {
      return Yup.mixed().notRequired();
    }
  }),
  minSalary: Yup.string().when("salaryType", (value) => {
    if (value === "range") {
      return Yup.number()
        .typeError("Number please")

        .required("This is required");
    } else {
      return Yup.mixed().notRequired();
    }
  }),
  maxSalary: Yup.string().when("salaryType", (value) => {
    if (value === "range") {
      return Yup.number()
        .typeError("Number please")

        .required("This is required");
    } else {
      return Yup.mixed().notRequired();
    }
  }),
  postedBy: Yup.string()
    .max(255, "Maximum 255 charcters")
    .required("This is required"),

  terms: Yup.bool().oneOf([true], "Accept Terms & Conditions is required"),
  expCategory: Yup.string().required("Choose One Option"),
});

export const validationSchemaUpdateKYC = Yup.object().shape({
  orgName: Yup.string()
    .max(255, "Must be 255 characters or less")
    .required("Organisation Name is required"),
  orgEmail: Yup.string()
    .max(255, "Must be 255 characters or less")
    .required("Official email is required"),
  orgDetails: Yup.string()
    .max(5000, "Must be 5000 characters or less")
    .required("Organisation Deatails is required"),
  pincode: Yup.number()
    .typeError("Enter number only")
    .required("This is required"),
  state: Yup.string()
    .max(255, "Must be 255 characters or less")
    .required("state is required"),
  city: Yup.string()
    .max(255, "Must be 255 characters or less")
    .required("City is required"),
  orgAddress1: Yup.string()
    .max(255, "Must be 255 characters or less")
    .required("This is required"),
  orgAddress2: Yup.string().max(255, "Must be 255 characters or less"),

  orgWebsite: Yup.string()
    .max(255, "Must be 255 characters or less")
    .required("This is required"),
  faceBookLink: Yup.string()
    .max(255, "Must be 255 characters or less")
    .required("This is required"),
  linkedInLink: Yup.string()
    .max(255, "Must be 255 characters or less")
    .required("This is required"),
  pancardLink: Yup.string()
    .max(255, "Must be 255 characters or less")
    .required("This is required"),
  orgType: Yup.string().required("Select Type"),
  terms: Yup.bool().oneOf([true], "Accept Terms & Conditions is required"),
});
export const validationSchemaNews = Yup.object().shape({
  newsTitle: Yup.string()
    .max(160, "Must be 160 characters or less")
    .required("News Tite is required"),
  newsDescription: Yup.string()
    .max(5000, "Must be 5000 characters or less")
    .required("This is required"),
  newsLink: Yup.string()
    .max(255, "Must be 255 characters or less")
    .required("News Link is required"),
  newsDate: Yup.string().required("This is required"),
});

export const validationSchemaCSr = Yup.object().shape({
  organisationName: Yup.string()
    .max(255, "Must be 255 characters or less")
    .required("Organisation name is required"),
});
export const validationSchemaAcademics = Yup.object().shape({
  title: Yup.string()
    .max(160, "Must be 160 characters or less")
    .required("Event Title is required"),
  organisedBy: Yup.string()
    .max(60, "Must be 60 characters or less")
    .required("Organisation Name is required"),

  applicationDeadline: Yup.string().required("Please select Deadline Date"),
  webpageLink: Yup.string()
    .max(255, "Must be 255 characters or less")
    .required("This is required"),

  terms: Yup.bool().oneOf([true], "Accept Terms & Conditions is required"),

  location: Yup.string().when("eventType", (value) => {
    if (value === "Offline") {
      return Yup.string().required("This is required");
    } else {
      return Yup.mixed().notRequired();
    }
  }),
});

const buildRequiredForString = (requiredText) => ({
  is: "Yes",
  then: Yup.string()
    .max(255, "Must be 160 characters or less")
    .required(requiredText),
});
const buildRequiredForNumber = (requiredText) => ({
  is: "Yes",
  then: Yup.number()
    .typeError("You must specify a Number")
    .required(requiredText),
});

export const validationSchemaFundingUpdateNgo = Yup.object().shape({
  orgName: Yup.string()
    .max(160, "Must be 160 characters or less")
    .required("Name is required"),
  fullTime: Yup.number()
    .required("This is required")
    .typeError("You must specify a Number"),
  partTime: Yup.number().typeError("You must specify a Number"),
  volunteers: Yup.number().typeError("You must specify a Number"),
  consultants: Yup.number().typeError("You must specify a Number"),
  orgTurnover: Yup.number().typeError("You must specify a Number"),
  orgBudget: Yup.number().typeError("You must specify a Number"),
  prevQue: Yup.string().required("This is required"),

  description: Yup.string().when(
    "prevQue",
    buildRequiredForString("This is Required")
  ),

  targetAudience: Yup.string().when(
    "prevQue",
    buildRequiredForString("This is Required")
  ),
  fundedBy: Yup.string().when(
    "prevQue",
    buildRequiredForString("This is Required")
  ),
  fromYear: Yup.number().when(
    "prevQue",
    buildRequiredForNumber("This is Required")
  ),
  toYear: Yup.number().when(
    "prevQue",
    buildRequiredForNumber("This is Required")
  ),
  optionsOutlined: Yup.string().when(
    "prevQue",
    buildRequiredForString("This is Required")
  ),
});
