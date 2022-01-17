import merge from 'lodash.merge'
import {listingResolvers} from './Listing'

// This will be the collection area of all the resolvers.
// once all imported here, I will merge them using lodash.merge,
// and export it as a single resolver object.

export const resolvers = merge(listingResolvers)

// from here on all the resolvers will be merged together by being placed in the merge() function.