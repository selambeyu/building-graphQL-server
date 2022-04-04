const { type } = require("express/lib/response");
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

// Hard coded data

const customers = [
  {
    id: "1",
    name: "jone doe",
    age: 30,
    email: "jonne@gmai.com",
  },
  {
    id: "2",
    name: "Kebed Alemu",
    age: 55,
    email: "kebed@gmai.com",
  },
  {
    id: "3",
    name: "Taye balcha",
    age: 45,
    email: "taye@gmai.com",
  },
  {
    id: "4",
    name: "Minilik tikursewu",
    age: 127,
    email: "Minilik@gmai.com",
  },
];

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

// Root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    customer: {
      type: CustomerType,
      args: {
        id: {type: GraphQLID },
      },
      resolve(parentValue, args) {
          console.log(parentValue,"parentValue");
          console.log(args,"args")
          for(let i =0 ;i<customers.length;i++){
              if(customers[i].id==args.id){
                  return customers[i]
              }
          }
      },
    },
    customers:{
        type:new GraphQLList(CustomerType),
        resolve(parentValue,args){
            return customers;
        }
    }
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
