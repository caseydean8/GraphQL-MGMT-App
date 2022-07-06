import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Project from "./pages/Project";

// Merge function added handle cache data warning in console from delete client handling in ClientRow.jsx line 13 and add client handling in AddClientModal.jsx line 14
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          },
          projects: {
            merge(existing, incoming) {
              return incoming;
            },
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  // uri: "http://localhost:5000/graphql",
  // set uri for heroku deployment
  uri: "https://graphql-mgmt.herokuapp.com/",
  // cache: new InMemoryCache(), replaced with cache variable
  cache,
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Router>
          <Header />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects/:id" element={<Project />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Router>
      </ApolloProvider>
    </>
  );
}

export default App;
