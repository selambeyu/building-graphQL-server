const { type } = require("express/lib/response");
const axios =require('axios')
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
        //   console.log(parentValue,"parentValue");
        //   console.log(args,"args")
        //   for(let i =0 ;i<customers.length;i++){
        //       if(customers[i].id==args.id){
        //           return customers[i]
        //       }
        //   }
        return axios.get('http://localhost:3000/customers/'+args.id).then(res=>res.data)
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
