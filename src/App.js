import React from 'react';
import './App.css';
import FoodsTable from './components/FoodsTable';

class App extends React.Component {
  state = {
    error: null,
    isLoaded: true,
    foods: [],
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
        .then(res => {
          // Refine search to look for exact match only
          if (res.totalHits && res.totalHits !== 0) {
            const foods = res.foods.filter(
              (food) => food.description.toLowerCase() === search
            );
            return { foods };
          } else {
            return res;
          }
        })
        .then(
          (result) => {
            console.log(result);

            if (result.totalHits === 0) {
              const error = { message: `No results found for: "${search}"` };

              this.setState({
                isLoaded: true,
                error,
                foods: [],
              });
            } else {
              this.setState({
                isLoaded: true,
                error: null,
                foods: result.foods,
              });
            }
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

  render() {
    const { error, isLoaded, foods } = this.state;

    return (
      <div className="App">
        <h1>nutrition app</h1>
        <form onSubmit={this.handleSearch}>
          <input autoFocus type="text" name="search" />
          <button>Search</button>
          {error && <div>Error fetching data: {error.message}</div>}
          {!isLoaded ? <div>Loading...</div> : <FoodsTable data={foods} />}
        </form>
      </div>
    );
  }
}

export default App;
