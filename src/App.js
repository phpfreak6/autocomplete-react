import SearchComponent from './Components/SearchComponent';

function App() {

  const search_url = 'https://toro278.us-east.toroserver.com/api/demo_api_inventory/1.0/sku/search?sku_name=';
  const requestObj = { response_key: 'sku', key: 'sku_id', value: 'sku_name' };
  return (
    <div className="App">
      <SearchComponent
        searchData={requestObj}
        searchUrl={search_url}
      ></SearchComponent>
    </div>
  );
}

export default App;
