const { type } = require("express/lib/response");
const axios = require("axios");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLList,
  GraphQLID,
} = require("graphql");



// Curstormer Type

const CustomerType = new GraphQLObjectType({
  name: "Customer",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    age: { type: GraphQLInt },
  }),
});

// Movie Type

const MovieType = new GraphQLObjectType({
  name: "Movie",
  fields: () => ({
    id: { type: GraphQLString },
    movie_name: { type: GraphQLString },
    duration: { type: GraphQLString },
    rating:{type:GraphQLString}
  }),
});

// Root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    customer: {
      type: CustomerType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parentValue, args) {
     
        return axios
          .get("http://localhost:3000/customers/" + args.id)
          .then((res) => res.data);
      },
    },
    customers: {
      type: new GraphQLList(CustomerType),
      resolve(parentValue, args) {
        return axios.get('http://localhost:3000/customers').then((res)=>res.data)
      },
    },
    movie: {
      type: MovieType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parentValue, args) {
        return axios
          .get("http://localhost:3000/movies/" + args.id)
          .then((res) => res.data);
      },
    },
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parentValue, args) {
        return axios.get('http://localhost:3000/movies').then((res)=>res.data)
      },
    },
  },
});

// Mutuation

const mutuations = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addCustomer: {
      type: CustomerType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve(parentValue, args) {
        return axios
          .post("http://localhost:3000/customers/", {
            name: args.name,
            email: args.email,
            age: args.age,
          })
          .then((res) => res.data);
      },
    },
    deleteCustomer: {
      type: CustomerType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parentValue, args) {
        return axios
          .delete("http://localhost:3000/customers/" + args.id)
          .then((res) => res.data);
      },
    },
    editCustomer: {
      type: CustomerType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve(parentValue, args) {
        return axios
          .patch("http://localhost:3000/customers/" + args.id, {
            name: args.name,
            email: args.email,
            age: args.age,
          })
          .then((res) => res.data);
      },
    },
    addMovie: {
      type: MovieType,
      args: {
        movie_name: { type: new GraphQLNonNull(GraphQLString) },
        duration: { type: new GraphQLNonNull(GraphQLString) },
        rating:{type:new GraphQLNonNull(GraphQLString)}
      },
      resolve(parentValue, args) {
        return axios
          .post("http://localhost:3000/movies/", {
            movie_name: args.movie_name,
            duration: args.duration,
            rating:args.rating
          })
          .then((res) => res.data);
      },
    },
    editMovie: {
      type: MovieType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        movie_name: { type: new GraphQLNonNull(GraphQLString) },
        duration: { type: new GraphQLNonNull(GraphQLString) },
        rating:{type:new GraphQLNonNull(GraphQLString)}
      
      },
      resolve(parentValue, args) {
        return axios
          .patch("http://localhost:3000/movies/" + args.id, {
            movie_name: args.movie_name,
            duration: args.duration,
            rating:args.rating
          
          })
          .then((res) => res.data);
      },
    },
    deleteMovie: {
      type: MovieType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parentValue, args) {
        return axios
          .delete("http://localhost:3000/movies/" + args.id)
          .then((res) => res.data);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: mutuations,
});
