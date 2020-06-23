import React from 'react';
import './App.css';
import FoodsTable from './components/FoodsTable';

class App extends React.Component {
  state = {
    error: null,
    isLoaded: true,
    foods: null,
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
        //     return { foods };
        //   } else {
        //     return res;
        //   }
        // })
        .then(
          (result) => {
            console.log(result);

            this.setState({
              isLoaded: true,
              error: null,
              foods: result.foods,
              totalHits: result.totalHits,
              currentPage: result.currentPage,
              query: search,
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

  handleChangePage = () => {
    console.log('page change')
  }

  render() {
    const {
      error,
      isLoaded,
      foods,
      query,
      totalHits,
      currentPage,
    } = this.state;

    const displayLoading = <div>Loading...</div>;

    const displayResults = (
      <div>
        {isLoaded && foods && (
          <div>
            {totalHits} results for "{query}"
          </div>
        )}
        <FoodsTable
          foods={foods}
          totalHits={totalHits}
          currentPage={currentPage}
          handleChangePage={this.handleChangePage}
        />
      </div>
    );

    return (
      <div className="App">
        <h1>nutrition app</h1>
        <form onSubmit={this.handleSearch}>
          <input autoFocus type="text" name="search" />
          <button>Search</button>
          {error && (
            <div>
              Error fetching data: {error.message}
            </div>
          )}
          {!isLoaded ? displayLoading : displayResults}
        </form>
      </div>
    );
  }
}

export default App;
