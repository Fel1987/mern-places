import PlaceList from "../components/PlaceList";
import { useParams } from "react-router";

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "Not much to see...",
    imageUrl:
      "https://www.exp1.com/wp-content/uploads/sites/7/2020/07/empire_state_building_50_1_50-1024x683.jpg",
    address: "20 W 34th St., New York, NY 10001, United States",
    location: { lat: 40.7484405, lng: -73.9856644 },
    creator: "u1",
  },
  {
    id: "p2",
    title: "Empire State Building",
    description: "Not much to see...",
    imageUrl:
      "https://www.exp1.com/wp-content/uploads/sites/7/2020/07/empire_state_building_50_1_50-1024x683.jpg",
    address: "20 W 34th St., New York, NY 10001, United States",
    location: { lat: 40.7484405, lng: -73.9856644 },
    creator: "u2",
  },
];

const UserPlaces = (props) => {
  const { userId } = useParams();
  const loadedPlaces = DUMMY_PLACES.filter((place) => place.creator === userId);
  return <PlaceList items={loadedPlaces} />;
};

export default UserPlaces;
