import { gql } from "@apollo/client";

const COUNTRIES_DATA = gql`
  query GetCountry {
    countries {
      name
      native
      continent {
        name
      }
      capital
      languages {
        name
      }
      phone
      currency
      code
      states {
        name
      }
    }
  }
`;

export const generateQueryFindByCode = (code) => {
  return gql(`
  query {
    countries(filter: { code: { eq: "${code}" } }) {
      name
      native
      continent {
        name
      }
      capital
      languages {
        name
      }
      phone
      currency
      code
      states {
        name
      }
    }
  }
  `);
};

export default COUNTRIES_DATA;
