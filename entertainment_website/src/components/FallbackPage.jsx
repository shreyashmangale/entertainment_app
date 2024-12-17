import React from 'react';
import ReactLoading from 'react-loading';
 
const FallbackPage = ({ type, color }) => (
  <div className="flex justify-center items-center h-[50vh]">
    <ReactLoading type={'bubbles'} color={color} height={'6%'} width={'6%'} />
  </div>
);
 
export default FallbackPage;