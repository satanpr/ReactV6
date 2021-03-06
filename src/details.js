import { React, Component } from "react";
import { withRouter } from "react-router-dom";
import Carousel from "./carousel";
import ErrorBoundary from "./errorBoundary";
import ThemeContext from "./themeContext";

class Details extends Component {
  //   constructor() {
  //     super();
  //     this.state = {
  //       loading: true,
  //     };
  //   }

  //   above snippet can be changed to below on using class properties of babel. For this configuration has to be done in babelrc and eslintrc

  state = {
    loading: true,
  };

  async componentDidMount() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?id=${this.props.match.params.id}`
    );

    const json = await res.json();
    this.setState(
      Object.assign(
        {
          loading: false,
        },
        json.pets[0]
      )
    );
  }

  render() {
    if (this.state.loading) {
      return <h2>Loading...</h2>;
    }
    console.log(this.state);
    const { animal, breed, city, state, description, name, images } =
      this.state;

    // uncomment to see the Error Boundaries functionalities
    // throw new console.error("Something didnt work");
    return (
      <div className="details">
        <Carousel images={images} />
        <div>
          <h1>{name}</h1>
          <h2>
            {animal} - {breed} - {city}, {state}
          </h2>
          <ThemeContext.Consumer>
            {([theme]) => (
              <button style={{ backgroundColor: theme }}>Adopt {name}</button>
            )}
          </ThemeContext.Consumer>

          <p>{description}</p>
        </div>
      </div>
    );
  }
}

// withRouter is going to pass the details to Details component. TODO
// export default withRouter(Details);

export default function DetailsWithErrorBoundary() {
  const DetailsWithRouter = withRouter(Details);
  return (
    <ErrorBoundary>
      <DetailsWithRouter />
    </ErrorBoundary>
  );
}
