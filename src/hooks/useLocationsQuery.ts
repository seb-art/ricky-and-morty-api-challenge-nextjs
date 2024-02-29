import { useQuery, gql } from '@apollo/client';

const LOCATIONS_QUERY = gql`
  query {
    locations {
      id
      name
      type
      residents {
        id
        name
        status
        image
      }
    }
  }
`;

export const useLocationsQuery = () => {
  return useQuery(LOCATIONS_QUERY);
};