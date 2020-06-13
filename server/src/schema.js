const { gql } = require('apollo-server');

const typeDefs = gql`
# Query and Mutation 
    type Query {
        launches(
            """
            The number of results to show. Must be >= 1. Default = 20
            """
            pageSize: Int
            """
            If you add a cursor here, it will only return results _after_ this cursor
            """
            after: String
        ): LaunchConnection!

        launch(id: ID!): Launch
        me: User
    }

    type Mutation {
        bookTrips(launchIds: [ID]!): TripUpdateResponse!
        cancelTrip(launchId: ID!): TripUpdateResponse!
        login(email: String): String # login token
    }

# Query and Mutation: types
    """
    Simple wrapper around our list of launches that contains a cursor to the
    last item in the list. Pass this cursor to the launches query to fetch results
    after these.
    """
    type LaunchConnection { # add this below the Query type as an additional type.
        cursor: String!
        hasMore: Boolean!
        launches: [Launch]!
    }

    type TripUpdateResponse {
        success: Boolean!
        message: String
        launches: [Launch]
    }

#   graph relations
    type Launch {
        id: ID!
        site: String
        mission: Mission
        rocket: Rocket
        isBooked: Boolean!
    }

    type Rocket {
        id: ID!
        name: String
        type: String
    }

    type User {
        id: ID!
        email: String!
        trips: [Launch]!
    }

    type Mission {
        name: String
        missionPatch(size: PatchSize): String
    }

    enum PatchSize {
        SMALL
        LARGE
    }

`;

module.exports = typeDefs;