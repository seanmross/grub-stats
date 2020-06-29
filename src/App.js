import React from 'react';
import FoodsTable from './components/FoodsTable';
import "./styles/styles.scss";
import Header from './components/Header';
import Search from './components/Search';
import NumSearchResults from './components/NumSearchResults';
import Loading from './components/Loading';

class App extends React.Component {
  state = {
    error: null,
    isLoaded: true,
    foods: null,
    searchValue: "",
    searchResult: ""
  };

  handleSearch = (e) => {
    e.preventDefault();
    const search = e.target.elements.search.value.trim();

    if (search) {
      const api =
        "https://api.nal.usda.gov/fdc/v1/foods/search?api_key=DEMO_KEY";

      const endpoint = encodeURI(api.concat(`&query=${search}`));

      this.setState({ isLoaded: false });

      fetch(endpoint)
        .then((res) => res.json())
        // .then(res => {
        //   // Refine search to look for exact match only
        //   if (res.totalHits && res.totalHits !== 0) {
        //     const foods = res.foods.filter(
        //       (food) => food.description.toLowerCase() === search
        //     );
        //     return { foods, totalHits: foods.length };
        //   } else {
        //     return res;
        //   }
        // })
        .then(
          (result) => {
            console.log(result);
            const { foods, totalHits } = result;

            this.setState({
              isLoaded: true,
              error: null,
              foods,
              searchResult: search,
              totalHits,
            });
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error,
            });
          }
        );
    }
  };

  handleSearchInputChange = (e) => {
    this.setState({ searchValue: e.target.value });
  }

  handleSearchInputClear = () => {
    this.setState({ searchValue: "" });
    document.getElementById('search').focus();
  }

  render() {
    const { error, isLoaded, foods, searchResult, totalHits } = this.state;

    const template = (
      <div>
        {isLoaded && foods && <NumSearchResults searchResult={searchResult} totalHits={totalHits} />}
        <FoodsTable data={foods} />
      </div>
    );

    const title = "grub stats";
    const subtitle = "going beyond the macros";

    return (
      <div>
        <Header title={title} subtitle={subtitle} />
        <div className="container">
          <form onSubmit={this.handleSearch}>
            <div className="search__wrapper">
              <Search
                searchValue={this.state.searchValue}
                change={this.handleSearchInputChange}
                clear={this.handleSearchInputClear}
              />
            </div>
            {error && <div>Error fetching data: {error.message}</div>}
            {!isLoaded ? <Loading /> : template}
          </form>
        </div>
      </div>
    );
  }
}

export default App;
