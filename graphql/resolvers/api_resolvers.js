const StudentResolver = require("../../graphql/resolvers/student_resolver");
const BookResolver = require("../../graphql/resolvers/book_resolver");
const ProgrammeResolver = require("../../graphql/resolvers/programme_resolver");
const CourseResolver = require("../../graphql/resolvers/course_resolver");
const FacilitatorResolver = require("../../graphql/resolvers/facilitator_resolver");
const  ContactResolver = require("../../graphql/resolvers/contact_resolver");
const FeesResolver = require("../../graphql/resolvers/fees_resolver");

const api_resolvers = {
    ...StudentResolver,
    ...BookResolver,
    ...ProgrammeResolver,
    ...CourseResolver,
    ...FacilitatorResolver,
    ...ContactResolver,
    ...FeesResolver
}
module.exports= api_resolvers;