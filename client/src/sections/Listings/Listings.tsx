import { useQuery, useMutation, gql } from "@apollo/client";
import { Listings as ListingsData } from "./__generated__/Listings";
import {
  DeleteListing as DeleteListingData,
  DeleteListingVariables,
} from "./__generated__/DeleteListing";
import { Avatar, List, Button, Spin, Alert } from "antd";
import "./styles/Listings.css";
import { ListingsSkeleton } from "./components";

// this makes actual graphql request to the server as query. So this const is going to be sent to server and server expects this format.
// what is expected is a promise, and we made a listings const to store the awaited response.
// then console.logged the response.
//EZ
const LISTINGS = gql`
  query Listings {
    listings {
      id
      title
      image
      address
      price
      numOfGuests
      numOfBeds
      numOfBaths
      rating
    }
  }
`;
// this is the same as above, but for deleteListing
// deletelisting mutation takes id as input which is ID!. then it passed as variable to the server.
// what returns is the id of the deleted listing. which in return is passed to the client.
const DELETE_LISTING = gql`
  mutation DeleteListing($id: ID!) {
    deleteListing(id: $id) {
      id
    }
  }
`;

interface Props {
  title: string;
  owner: string;
}

// destructured the props and typeDefined them using the interface's name. then passed them to the component.
export const Listings = ({ title, owner }: Props) => {
  const { data, loading, refetch, error } = useQuery<ListingsData>(LISTINGS);

  const [
    deleteListing,
    { loading: deleteListingLoading, error: deleteListingError },
  ] = useMutation<DeleteListingData, DeleteListingVariables>(DELETE_LISTING);

  const hadnleDeleteListings = async (id: string) => {
    await deleteListing({ variables: { id } });
    refetch();
  };

  const listings = data ? data.listings : null;

  const listingsList = listings ? (
    <List
      itemLayout="horizontal"
      dataSource={listings}
      renderItem={(listing) => (
        <List.Item
          actions={[
            <Button
              type="primary"
              onClick={() => hadnleDeleteListings(listing.id)}
            >
              Delete
            </Button>,
          ]}
        >
          <List.Item.Meta
            title={listing.title}
            description={listing.address}
            avatar={<Avatar src={listing.image} shape="square" size={48} />}
          />
          {/* <h4>Address</h4>
        <List.Item.Meta description={listing.address} /> */}
        </List.Item>
      )}
    />
  ) : null;

  // const listingsList = listings ? (
  //   <ul>
  //     {listings.map((listing) => {
  //       return (
  //         <li key={listing.id}>
  //           {listing.title}{" "}
  //           <button onClick={() => hadnleDeleteListings(listing.id)}>
  //             Delete This Listing.
  //           </button>
  //         </li>
  //       );
  //     })}
  //   </ul>
  // ) : null;

 
  if (error) {
    return (
      <div className="listings">
        <ListingsSkeleton title={title} error />
      </div>
    );
  }
  if (error)
    return <Alert message="Beep Boop.. An Error has occured!" type="error" />;

    const deleteListingErrorAlert = deleteListingError ? (
      <Alert
        message="Beep Boop.. An Error has occured :/ "
        type="error"
        className="listings__alert"
      />
    ) : null;
  

  return (
    <div className="listings">
      <Spin spinning={deleteListingLoading}>
        {/* Note that spinning wheel takes a spinning prop, which is actually the trigger. Spinner will spin when deletelistingloading is active.      */}
        <h2>
          {title} Listings Owned by {owner}
        </h2>
        {deleteListingErrorAlert}
        {listingsList}

        {/* Curly braces { } are special syntax in JSX. It is used to evaluate a JavaScript expression during compilation.
 A JavaScript expression can be a variable, function, an object, or any code that resolves into a value. */}
      </Spin>
    </div>
  );
};
