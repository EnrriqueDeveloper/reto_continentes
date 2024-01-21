import { useContext, useEffect, useState } from "react";
import COUNTRIES_DATA, { generateQueryFindByCode } from "../graphql/getCountries";
import { useQuery } from "@apollo/client";
import { useParams, useLocation, Link } from "react-router-dom";

import { FaTimes } from "react-icons/fa";
import { getImageUrl } from "../image";
import Navbar from "./Navbar";
import { AppContext } from "../AppProvider";
import CountryItemImage from "./CountryItemImage";
const Country = () => {
  const params = useParams();
  const location = useLocation();
  const country = params.country;
  const [selectedCountry, setSelectedCountry] = useState(null);
  const { data, error, loading } = useQuery(COUNTRIES_DATA);
  useEffect(() => {
    if (location.pathname == "/") {
      return setSelectedCountry(null);
    }
    if (data) {
      const findCountry = data.countries.find((item) => item.code == country);
      if (findCountry) {
        const flagImage = `https://flagsapi.com/${findCountry.code}/flat/64.png`;
        setSelectedCountry({ ...findCountry, flagImage });
      }
    }
    //eslint-disable-next-line
  }, [location, data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error... {error.message}</p>;

  return (
    <>
      <Navbar />
      <div className="flex flex-1 gap-3 p-5">
        <Countries selectedCountry={selectedCountry} countries={data.countries} />
        {country && selectedCountry && <CountryInfo countryCode={country} />}
      </div>
    </>
  );
};

//eslint-disable-next-line
const Countries = ({ countries, selectedCountry }) => {
  const { inputName, continent } = useContext(AppContext);

  const [filteredCountries, setFilteredCountries] = useState([]);
  useEffect(() => {
    let newCountries = [];
    if (!inputName && continent) {
      //eslint-disable-next-line
      newCountries = countries.filter((item) => item.continent.name.includes(continent));
      setFilteredCountries(newCountries);
    }
    if (inputName && continent) {
      //eslint-disable-next-line
      newCountries = countries.filter((item) => item.name.toLowerCase().includes(inputName.toLowerCase()) && item.continent.name.includes(continent));
      setFilteredCountries(newCountries);
    }

    if (inputName && !continent) {
      //eslint-disable-next-line
      newCountries = countries.filter((item) => item.name.toLowerCase().includes(inputName.toLowerCase()));
      setFilteredCountries(newCountries);
    }
    //eslint-disable-next-line
  }, [inputName, continent]);
  const givenCountries = inputName || continent ? filteredCountries : countries;
  return (
    <div className={`${selectedCountry ? "hidden md:grid-cols-1 lg:grid-cols-2" : "grid"} flex-1 md:grid-cols-2 lg:grid-cols-3  md:grid columns-1 gap-10 `}>
      {givenCountries.map((country, i) => {
        return <CountryItem country={country} key={i} />;
      })}
    </div>
  );
};
//eslint-disable-next-line
const CountryItem = ({ country }) => {
  const flagImage = `https://flagsapi.com/${country.code}/flat/64.png`;
  return (
    <div className="w-[80] h-60 flex overflow-hidden group shadow shadow-cyan-500 rounded-3xl bg-white">
      <Link className="w-full h-60" to={`/${country.code}`}>
        <div key={country.name} className="rounded shadow-md">
          <CountryItemImage name={country.name} capital={country.capital} />
          {/* Puedes agregar más detalles según tus necesidades */}
        </div>
        <div className="flex gap-2 items-center  group-hover:bg-blue-500 group-hover:text-white p-3">
          <div>
            <img className="w-[50px]  h-[50px] object-contain" src={flagImage} alt="country image" />
          </div>
          <div className="flex flex-col gap-0">
            <h3 className="text-lg text-blue-400 group-hover:text-white font-bold">{country.name}</h3>
            <p>{country.continent.name}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

const CountryInfo = ({ countryCode }) => {
  const { data, error, loading } = useQuery(generateQueryFindByCode(countryCode));

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error... {error.message}</p>;
  const country = data.countries[0];

  const flagImage = `https://flagsapi.com/${country.code}/flat/64.png`;
  return (
    <div className="bg-white flex md:w-1/2 flex-col flex-1 p-3">
      <div className="flex justify-end">
        <Link className="text-2xl" to={"/"}>
          <FaTimes />
        </Link>
      </div>
      <div className="w-12/12">
        <CountryInfoImage name={country.name} capital={country.capital} />
      </div>
      <div className="flex gap-2 items-center  group-hover:bg-blue-500 group-hover:text-white p-3">
        <div className="relative w-[50px] rounded-xl overflow-hidden  h-[50px]">
          <img className="w-full h-full absolute object-contain" src={flagImage} alt="country image" />
        </div>
        <div className="flex flex-col gap-0">
          <h3 className="text-lg text-blue-400 group-hover:text-white font-bold">{country.name}</h3>
          <p className="text-sm">{country.continent.name}</p>
        </div>
      </div>
      <div className="text-lg flex gap-2">
        <span className="text-blue-500 font-bold">Capital:</span>
        <span className="text-gray-700">{country.capital}</span>
      </div>
      <div className="text-lg flex gap-2">
        <span className="text-blue-500 font-bold">Language:</span>
        <span className="text-gray-700">{country.languages?.[0]?.name}</span>
      </div>
      <div className="text-lg flex gap-2">
        <span className="text-blue-500 font-bold">Currency:</span>
        <span className="text-gray-700">{country.currency}</span>
      </div>
      <div className="text-lg flex flex-col gap-2">
        <span className="text-blue-500 font-bold">Region</span>
        <div className="shadow-lg shadow-gray-400 rounded-xl max-h-[200px] overflow-auto p-3 ">
          {country.states.map((item, i) => {
            return (
              <div key={i}>
                <span>{item.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const CountryInfoImage = ({ name, capital }) => {
  const location = useLocation();

  const [imageUrl, setImageUrl] = useState(null);
  useEffect(() => {
    (async () => {
      const query = `${name}%20${capital}%20drone`;
      const cachedImage = localStorage.getItem(query);
      if (cachedImage) {
        return setImageUrl(cachedImage);
      } else {
        // Fetch from API and store in cache
        const image = await getImageUrl(query);
        if (image) {
          localStorage.setItem(query, image.src.original);
          setImageUrl(image.src.original);
        }
      }
    })();
  }, [location]);
  if (!imageUrl) return <div className="bg-black w-full h-[200px]"></div>;
  return <img className="w-full rounded-xl h-[200px] object-cover border border-black" src={imageUrl} alt="" />;
};

export default Country;