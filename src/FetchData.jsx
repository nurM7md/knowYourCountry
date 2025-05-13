import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

const FetchData = () => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="container m-auto my-14">
      <h3 className="font-serif text-8xl text-cyandark ">Know your <br /> contry....</h3>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="py-3 pl-5 pr-10 m-auto my-10 bg-transparent border-2 outline-none text-cyandark border-cyandark rounded-2xl placeholder:text-cyandark placeholder:font-serif"
        placeholder="...enter your country !"
        
      />
     
        <div>
          <table className=" border-2 border-cyandark text-white divide-x divide-y divide-cyandark table-fixed  w-[650px] md:w-[800px]">
          <thead className="text-lg text-cyandark">
            <th className="font-bold border border-cyandark">name</th>
            <th className="font-bold border border-cyandark">flag</th>
            <th className="font-bold border border-cyandark">capital</th>
            <th className="p-2 font-bold border border-cyandark">people count</th>
            <th className="font-bold border border-cyandark">timezone</th>
            <th className="font-bold border border-cyandark">currency</th>
          </thead>
          <tbody>
            {data
              .filter((contry) => {
                if (query.trim() === "") return false;

                return contry.name.common
                  .toLowerCase()
                  .includes(query.toLowerCase());
              })
              .map((contry, index) => {
                return (
                  <tr key={index}>
                    <td className="w-64 font-semibold break-words border text-cyandark border-cyandark">
                      {contry.name.common}
                    </td>
                    <td className="w-64 font-semibold break-words border text-cyandark border-cyandark">
                      {contry.flag}
                    </td>
                    <td className="w-64 font-semibold break-words border text-cyandark border-cyandark">
                      {contry.capital}
                    </td>
                    <td className="w-64 font-semibold break-words border text-cyandark border-cyandark">
                      {contry.population}
                    </td>
                    <td className="w-64 font-semibold break-words border text-cyandark border-cyandark">
                      {contry.timezones}
                    </td>
                    <td className="w-64 font-semibold break-words border border-blue-900 text-cyandark">
                      {contry.currencies
                        ? Object.values(contry.currencies)
                            .map((cur) => `${cur.name} (${cur.symbol})`)
                            .join(", ")
                        : "no currency"}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        </div>
      
    </div>
  );
};

export default FetchData;
