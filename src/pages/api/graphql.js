// pages/api/graphql.js
import { ApolloServer, gql } from "apollo-server-micro";

// graphQL schema
const typeDefs = gql`
  type CarouselSlide {
    id: ID!
    title: String!
    description: String!
    imageUrl: String!
  }

  type Query {
    carouselSlides: [CarouselSlide!]!
  }
`;

const slides = [
  {
    id: "1",
    title: "Tokyo, The Neon Metropolis",
    description:
      "Experience a blend of ancient traditions and futuristic innovation in Tokyo, where neon-lit skyscrapers and cutting-edge robotics create a mesmerizing urban landscape.",
    imageUrl:
      "https://images.unsplash.com/photo-1583930263826-a1c6a639eaf2?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fHRva3lvfGVufDB8fDB8fHwy",
  },
  {
    id: "2",
    title: "Dubai, The Sky's the Limit",
    description:
      "Dubai pushes the boundaries of architecture and luxury with record-breaking skyscrapers and visionary urban planning in the heart of the desert.",
    imageUrl:
      "https://images.unsplash.com/photo-1507318069136-ee091b2f26cb?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZHViYWklMjBuaWdodHxlbnwwfHwwfHx8Mg%3D%3D",
  },
  {
    id: "3",
    title: "Shanghai, City of Tomorrow",
    description:
      "Shanghai’s dynamic skyline and innovative urban solutions make it a symbol of rapid modernization, where tradition meets state-of-the-art design.",
    imageUrl:
      "https://images.unsplash.com/photo-1548919973-5cef591cdbc9?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hhbmdoYWklMjBuaWdodHxlbnwwfHwwfHx8Mg%3D%3D",
  },
  {
    id: "4",
    title: "Singapore, Smart & Sustainable",
    description:
      "Singapore integrates green spaces, smart technology, and efficient transport to create an eco-friendly urban paradise, a model for future cities.",
    imageUrl:
      "https://images.unsplash.com/flagged/photo-1562502307-e796076a4982?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDl8fHNpbmdhcG9yZXxlbnwwfHwwfHx8Mg%3D%3D",
  },
  {
    id: "5",
    title: "Hong Kong, The Vertical Future",
    description:
      "A dazzling skyline, smart city innovations, and cutting-edge transportation make Hong Kong a high-tech urban marvel, blending tradition with modern futurism.",
    imageUrl:
      "https://images.unsplash.com/photo-1646062142799-73dd49cf315a?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG9uZyUyMGtvbmclMjBza3lsaW5lfGVufDB8fDB8fHwy",
  },

  {
    id: "6",
    title: "San Francisco, Tech Capital of the World",
    description:
      "Home to Silicon Valley, San Francisco pioneers artificial intelligence, biotech, and self-driving cars, making it a global leader in tech-driven urban development.",
    imageUrl:
      "https://images.unsplash.com/photo-1545239403-734e488cad95?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTd8ODY0NzE3MHx8ZW58MHx8fHx8",
  },
];

const resolvers = {
  Query: {
    carouselSlides: () => slides,
  },
};

// apollo server instance
const apolloServer = new ApolloServer({ typeDefs, resolvers });
const startServer = apolloServer.start();

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }

  await startServer;
  await apolloServer.createHandler({
    path: "/api/graphql",
  })(req, res);
}

// disable body parsing for file uploads, etc.
export const config = {
  api: {
    bodyParser: false,
  },
};
