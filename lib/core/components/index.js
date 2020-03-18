/*
    This module contains the exports of all MantraComponent classes.
*/
import MantraComponent from './MantraComponent';
import MantraForm from './MantraForm';

export { MantraForm, MantraComponent };

/** This function is meant to be used in case of circular depenendencies regarding MantraComponent classes import */
export default function() {
    return {
        MantraComponent,
        MantraForm
    };
};