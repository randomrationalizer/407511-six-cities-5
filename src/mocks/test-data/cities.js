import mockOffers from "./offers";
import {getCitiesData} from "../../core";
import {cities} from "../../const";


const mockCities = getCitiesData(mockOffers, cities);

export default mockCities;
