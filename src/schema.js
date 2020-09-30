import path from "path"
import {makeExecutableSchema} from "graphql-tools"
import {fileLoader,mergeResolvers,mergeTypes}from "merge-graphql-schemas"
console.log(__dirname);
const allTypes = fileLoader(path.join(__dirname,"./api/**/*.graphql"))
const allResolvers = fileLoader(
    path.join(__dirname,"./api/**/*.js")
)
const typeDefs = mergeTypes(allTypes);
const resolvers = mergeResolvers(allResolvers);
const executableSchema = makeExecutableSchema({
    typeDefs,resolvers
})
export default executableSchema;