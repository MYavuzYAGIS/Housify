import React from "react";
import { Skeleton, Divider ,Alert} from "antd";
import './styles/ListingsSkeleton.css';

interface Props {
  title: string;
  error?:boolean;
}

export const ListingsSkeleton = ({ title ,error=false}: Props) => {
    const errorAlert = error?<Alert message="Beep Boop.. An Error has occured :/ " type="error" className="listings-skeleton__alert"   />:null;
    return(
    <div className="listings-skeleton" >
      {errorAlert}
      <h2>{title}</h2>
      <Skeleton active paragraph={{rows:1}}  />
      <Divider />
      <Skeleton active paragraph={{rows:1}}  />
      <Divider/>
      <Skeleton active paragraph={{rows:1}}  />
      <Divider/>
    </div>
    )
};

