import axios from "axios";

const THEMATIC_AREA = [
  "Agriculture/ Food Security And Rural Development",
  "Arts and culture",
  "Climate Change Adaptation / Resiliency & DRRM",
  "Drug Trafficking and Organized Crime",
  "Education and Skill Development",
  "Energy, Water & Environment",
  "Governance",
  "Health and Social Protection",
  "Human Rights",
  "Infrastructure",
  "Public Finance Management",
  "Internal Affairs",
  "Sustainable Industry and Economy",
  "Technology, Innovation & Social/Inclusive Business",
  "Others",
];

export const renderStates = (states) => {
  return (
    states &&
    states.length > 0 &&
    states.map((state, index) => {
      if (index === 0) {
        return <option value="" key={index} label="Select State" />;
      } else {
        return (
          <option
            key={index}
            value={state.state_name}
            label={state.state_name}
          />
        );
      }
    })
  );
};

export const renderStatesNew = (states) => {
  return (
    states &&
    states.length > 0 &&
    states.map((state, index) => {
      if (index === 0) {
        return <option value="" key={index} label="Select State" />;
      } else {
        return <option key={index} value={state.id} label={state.name} />;
      }
    })
  );
};

export const renderCities = (cities) => {
  return (
    cities &&
    cities.length > 0 &&
    cities.map((city, index) => {
      if (index === 0) {
        return <option key={index} value="" label="Select City" />;
      } else {
        return <option key={index} value={city.city_name} label={city.city_name} />;
      }
    })
  );
};

export const renderThematicArea = () => {
  return THEMATIC_AREA.map((area, index) => {
    if (index === 0) {
      return <option value="" key={index} label="Select Option" />;
    } else {
      return <option key={index} value={area} label={area} />;
    }
  });
};
export const onChangeStates = (e) => {
  let Authorization = localStorage.getItem("Authorization");

  return axios.get("https://www.universal-tutorial.com/api/cities/" + e, {
    headers: {
      Authorization: Authorization,
    },
  });
};
