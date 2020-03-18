import MantraString from './MantraString';
import MantraNumber from './MantraNumber';
import MantraBoolean from './MantraBoolean';

export { MantraString, MantraNumber, MantraBoolean };

/** This function is meant to be used in case of circular depenendencies regarding MantraDataType classes import */
export default function() {
    return {
        'String': MantraString,
        'Number': MantraNumber,
        'Boolean': MantraBoolean
    };
};