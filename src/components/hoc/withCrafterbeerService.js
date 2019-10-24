import React from 'react';
import { CrafterbeerServiceConsumer } from '../crafterbeer-service-context';

const withCrafterbeerService = () => (Wrapped) => {
  return (props) => {
    return (
      <CrafterbeerServiceConsumer>
        {
          (crafterbeerService) => {
            return <Wrapped {...props} crafterbeerService={crafterbeerService}/>
          }
        }
      </CrafterbeerServiceConsumer>
    );
  }
}

export default withCrafterbeerService;