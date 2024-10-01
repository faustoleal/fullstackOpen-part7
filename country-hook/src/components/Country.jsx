const Country = ({ country, error }) => {
  if (!country) {
    return null;
  }

  if (error) {
    return <div>not found</div>;
  }

  return (
    <div>
      <h3>{country.name.common}</h3>
      <div>capital: {country.capital}</div>
      <div>population: {country.population}</div>
      <img src={country.flags.svg} height="100" alt={country.flags.alt} />
    </div>
  );
};

export default Country;
